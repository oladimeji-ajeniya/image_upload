#!/bin/bash

# Ask user for confirmation before merging (pulling) code
echo "Do you want to pull the latest changes from the remote branch? (y/n)"
read -r pull_confirm

if [[ "$pull_confirm" == "y" || "$pull_confirm" == "Y" ]]; then
    echo "Pulling the latest changes from remote..."
    git pull origin $(git rev-parse --abbrev-ref HEAD)
else
    echo "Skipping pulling changes."
fi

# Check if there are conflicts
if git diff --name-only --diff-filter=U | grep -q ''; then
    echo "Merge conflicts detected!"

    # List files with conflicts
    echo "Conflicted files:"
    git diff --name-only --diff-filter=U

    # Allow user to resolve conflicts
    echo "Please resolve the conflicts and press any key to continue..."
    read -n 1 -s

    # Re-add resolved files
    git add .

    # Ask for a custom commit message
    echo "Enter a commit message for the resolved conflicts:"
    read commit_message

    # Commit the resolved changes with the user's commit message
    echo "Committing the resolved files..."
    git commit -m "$commit_message"

else
    echo "No conflicts detected."
fi

# Check if there are uncommitted changes (staged or unstaged)
if ! git diff-index --quiet HEAD --; then
    echo "There are uncommitted changes."

    # Stage all changes
    git add .

    # Ask for a commit message for uncommitted changes
    echo "Enter a commit message for the uncommitted changes:"
    read commit_message

    # Commit the changes
    echo "Committing the changes..."
    git commit -m "$commit_message"
else
    echo "No uncommitted changes."
fi

# Ask user for confirmation before pushing the code
echo "Do you want to push the changes to the remote branch? (y/n)"
read -r push_confirm

if [[ "$push_confirm" == "y" || "$push_confirm" == "Y" ]]; then
    echo "Pushing changes to remote..."
    git push origin $(git rev-parse --abbrev-ref HEAD)
    echo "Done!"
else
    echo "Push operation skipped."
fi
