async function main() {
    const yourOrganizationOwnerAddress = process.env.YOUR_ORGANIZATION_OWNER_ADDRESS;
  
    // Deploy RequestForApproval
    const RequestForApproval = await ethers.getContractFactory("RequestForApproval");
    const requestForApproval = await RequestForApproval.deploy(yourOrganizationOwnerAddress); // Replace with actual address
    console.log("RequestForApproval Contract Deployed to Address:", requestForApproval.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
