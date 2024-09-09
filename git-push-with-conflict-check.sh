#!/bin/bash

# Pull latest changes
echo "Pulling the latest changes from remote..."
git pull origin $(git rev-parse --abbrev-ref HEAD)

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

# Push changes
echo "Pushing changes to remote..."
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "Done!"
