# # Define variables
# $zipFileName = "archive.zip"
# $excludeDirs = @(".elasticbeanstalk", ".git", ".github", ".vscode", "node_modules")
# $excludeFiles = @(".gitignore", "package-lock.json", "yarn.lock")

# # Run npm build
# npm run build

# # Check if the build was successful
# if ($LASTEXITCODE -ne 0) {
#     Write-Host "npm build failed. Exiting script."
#     exit 1
# }

# # Create the zip file, excluding specified directories and files
# $itemsToZip = Get-ChildItem -Recurse -File | Where-Object {
#     $exclude = $false
#     foreach ($dir in $excludeDirs) {
#         if ($_.FullName -like "*\$dir\*") {
#             $exclude = $true
#             break
#         }
#     }
#     -not $exclude -and (-not ($excludeFiles -contains $_.Name))
# }

# # Create the ZIP archive using PowerShell's built-in tool
# if (Test-Path $zipFileName) {
#     Remove-Item $zipFileName
# }

# # Create an empty folder to zip the items
# $tempZipDir = "tempZipDir"
# New-Item -ItemType Directory -Path $tempZipDir -Force | Out-Null

# # Copy the filtered items to the temporary directory
# foreach ($item in $itemsToZip) {
#     Copy-Item $item.FullName -Destination $tempZipDir -Recurse -Force
# }

# # Compress the temporary directory into a zip file
# Compress-Archive -Path "$tempZipDir\*" -DestinationPath $zipFileName

# # Cleanup temporary directory
# Remove-Item $tempZipDir -Recurse -Force

# # Check if the zip file was created successfully
# if (-Not (Test-Path $zipFileName)) {
#     Write-Host "Failed to create zip file. Exiting script."
#     exit 1
# }

# # SSH details
# $server = "senso-final-eb-env.eba-pd25pgny.eu-central-1.elasticbeanstalk.com"
# $user = "ec2-user"
# $keyPath = ".\sshkey.key" # Replace with the actual path to your SSH key

# # Delete all files and folders in the target directory on the server
# ssh -i $keyPath $user@$server "sudo rm -rf /var/app/current/*"

# # Copy the zip file to the server
# scp -i ./sshkey.key $zipFileName ec2-user@senso-final-eb-env.eba-pd25pgny.eu-central-1.elasticbeanstalk.com:/var/app/current/

# # SSH into the server and unzip the file
# ssh -i $keyPath $user@$server "
#     cd /var/app/current;
#     unzip -o $zipFileName -d .;  # Unzip and overwrite existing files
#     npm install;                 # Install npm dependencies
#     npm run serve;               # Run the application
# "

# # Cleanup local zip file
# Remove-Item $zipFileName
# Write-Host "Deployment completed successfully."


# Define variables
$zipFileName = "archive.zip"
$excludeDirs = @(".elasticbeanstalk", ".git", ".github", ".vscode", "node_modules")
$excludeFiles = @(".gitignore", "package-lock.json", "yarn.lock")

# Run npm build
npm run build

# Check if the build was successful
if ($LASTEXITCODE -ne 0) {
    Write-Host "npm build failed. Exiting script."
    exit 1
}

# Define inclusion directories and files
$includeDirs = @("build", "dist", "media", "public", "src") # Add your inclusion folders here
$includeFiles = @(".editorconfig", ".env", ".env.example", ".eslintrc.js", "nodemon.json", "package.json", "package.sh", "postcss.config.js", "README.md", "redirects.js", "tailwind.config.js", "tailwind.css", "tsconfig.json", "tsconfig.server.json") # Add your inclusion files here

# Temporary directory for zipping
$tempZipDir = "tempZipDir"
New-Item -ItemType Directory -Path $tempZipDir -Force | Out-Null

# Copy the inclusion directories
foreach ($dir in $includeDirs) {
    if (Test-Path $dir) {
        Copy-Item $dir -Destination $tempZipDir -Recurse -Force
    }
}

# Copy the inclusion files
foreach ($file in $includeFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination $tempZipDir -Force
    }
}




# Create the ZIP archive using PowerShell's built-in tool
if (Test-Path $zipFileName) {
    Remove-Item $zipFileName
}

# Compress the temporary directory into a zip file
Compress-Archive -Path "$tempZipDir\*" -DestinationPath $zipFileName

# Cleanup temporary directory
Remove-Item $tempZipDir -Recurse -Force

# Check if the zip file was created successfully
if (-Not (Test-Path $zipFileName)) {
    Write-Host "Failed to create zip file. Exiting script."
    exit 1
}

# SSH details
$server = "senso-final-eb-env.eba-pd25pgny.eu-central-1.elasticbeanstalk.com"
$user = "ec2-user"
$keyPath = ".\sshkey.key" # Replace with the actual path to your SSH key

# Delete all files and folders in the target directory on the server
ssh -i $keyPath $user@$server "sudo rm -rf /var/app/current/*
sudo chmod -R 777 /var/app/current/"

# Copy the zip file to the server
scp -i ./sshkey.key $zipFileName ec2-user@senso-final-eb-env.eba-pd25pgny.eu-central-1.elasticbeanstalk.com:/var/app/current/

# SSH into the server and unzip the file
ssh -i $keyPath $user@$server '
    #!/bin/bash

    # Check if a swap file already exists
    if swapon --show | grep -q '/swapfile'; then
        echo "Swap file already exists. Exiting."
    else
        echo "Creating a 5 GB swap file..."

        # Create a 5 GB swap file
        sudo fallocate -l 5G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1G count=5

        # Set the correct permissions
        sudo chmod 600 /swapfile

        # Set up the swap area
        sudo mkswap /swapfile

        # Enable the swap file
        sudo swapon /swapfile

        # Verify that the swap file is active
        echo "Swap file created and activated:"
        sudo swapon --show

        # Make the swap file permanent by adding it to /etc/fstab
        if ! grep -q '/swapfile' /etc/fstab; then
            echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
            echo "Swap file entry added to /etc/fstab for persistence."
        else
            echo "Swap file entry already exists in /etc/fstab."
        fi
    fi

    cd /var/app/current;
    sudo unzip -o '+$zipFileName+' -d .;  # Unzip and overwrite existing files
    sudo rm '+$zipFileName+';              # Remove the zip file after extraction
    sudo chmod -R 777 /var/app/current/
    node --max-old-space-size=2048 $(which npm) install;
    sudo npm run serve;                # Run the application
'

# Cleanup local zip file
#Remove-Item $zipFileName
Write-Host "Deployment completed successfully."
