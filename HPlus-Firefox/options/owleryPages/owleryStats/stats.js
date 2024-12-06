function formatBytes(bytes) {
    if (bytes == 0) return "0B";
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(2)}${sizes[i]}`;
}

document.addEventListener("DOMContentLoaded", async () => {
    let userSetQuota = await browser.storage.sync.get('maxOwleryStorage'); // MB (user-set limit)
    userSetQuota = userSetQuota.maxOwleryStorage * 1048576; // Convert from MB to B
    let indexedDBUsed = await browser.runtime.sendMessage({ action: "get_db_storage_size" });
    indexedDBUsed = indexedDBUsed.reply;
    const userAvailableSpace = userSetQuota - indexedDBUsed;

    const userIndexedDBPercent = (indexedDBUsed / userSetQuota) * 100;
    const userAvailablePercent = (userAvailableSpace / userSetQuota) * 100;

    // Update Graph 1: User-Set Quota
    document.getElementById("user-indexeddb-bar").style.width = `${userIndexedDBPercent}%`;
    document.getElementById("user-available-bar").style.width = `${userAvailablePercent}%`;

    // Update the percentage text below Graph 1
    document.getElementById("user-indexeddb-percent").textContent = `${userIndexedDBPercent.toFixed(2)}% / ${formatBytes(indexedDBUsed)}`;
    document.getElementById("user-available-percent").textContent = `${userAvailablePercent.toFixed(2)}% / ${formatBytes(userAvailableSpace)}`;

    const storageEstimate = await navigator.storage.estimate();
    const browserMaxQuota = storageEstimate.quota; // Browser's max quota
    const totalStorageUsed = storageEstimate.usage; // All browser data

    const browserOtherStorageUsed = totalStorageUsed - indexedDBUsed;
    const browserAvailableSpace = browserMaxQuota - totalStorageUsed;

    const browserIndexedDBPercent = (indexedDBUsed / browserMaxQuota) * 100;
    const browserOtherStoragePercent = (browserOtherStorageUsed / browserMaxQuota) * 100;
    const browserAvailablePercent = (browserAvailableSpace / browserMaxQuota) * 100;


    // Update Graph 2: Browser's Max Quota
    document.getElementById("browser-indexeddb-bar").style.width = `${browserIndexedDBPercent}%`;
    document.getElementById("browser-other-bar").style.width = `${browserOtherStoragePercent}%`;
    document.getElementById("browser-available-bar").style.width = `${browserAvailablePercent}%`;

    // Update the percentage text below Graph 2
    document.getElementById("browser-indexeddb-percent").textContent = `${browserIndexedDBPercent.toFixed(2)}% / ${formatBytes(indexedDBUsed)}`;
    document.getElementById("browser-other-percent").textContent = `${browserOtherStoragePercent.toFixed(2)}% / ${formatBytes(browserOtherStorageUsed)}`;
    document.getElementById("browser-available-percent").textContent = `${browserAvailablePercent.toFixed(2)}% / ${formatBytes(browserAvailableSpace)}`;


    // Graph 3: Total Storage Used Perspective
    const totalOtherStorageUsed = totalStorageUsed - indexedDBUsed;
    const totalIndexedDBPercent = (indexedDBUsed / totalStorageUsed) * 100;
    const totalOtherPercent = (totalOtherStorageUsed / totalStorageUsed) * 100;

    // Update Graph 3: Total Storage Used
    document.getElementById("total-indexeddb-bar").style.width = `${totalIndexedDBPercent}%`;
    document.getElementById("total-other-bar").style.width = `${totalOtherPercent}%`;

    // Update the percentage text below Graph 3
    document.getElementById("total-indexeddb-percent").textContent = `${totalIndexedDBPercent.toFixed(2)}% / ${formatBytes(indexedDBUsed)}`;
    document.getElementById("total-other-percent").textContent = `${totalOtherPercent.toFixed(2)}% / ${formatBytes(totalOtherStorageUsed)}`;

    // Derived calculations
    const percentMaxQuotaUsed = ((totalStorageUsed / browserMaxQuota) * 100).toFixed(2);
    const percentUserQuotaUsed = ((indexedDBUsed / userSetQuota) * 100).toFixed(2);
    const percentIndexedDBBrowserUsed = ((indexedDBUsed / browserMaxQuota) * 100).toFixed(2);

    let savedOwlCount = await browser.runtime.sendMessage({ action: "get_saved_owls_count" });
    savedOwlCount = savedOwlCount.reply;
    const avgStoragePerOwl = savedOwlCount > 0 ? (indexedDBUsed / savedOwlCount).toFixed(2) : 0;
    const moreOwlsCanBeSaved = savedOwlCount > 0 ? Math.floor(userAvailableSpace / avgStoragePerOwl) : "שאלה טובה"; // Remaining owls
    const estimatedBackupSize = (indexedDBUsed * 1.05).toFixed(2); // Backup size (with overhead)
    let owlsSinceLastBackup = await browser.storage.sync.get('owlsSinceExport'); // Owls added since last backup
    owlsSinceLastBackup = owlsSinceLastBackup.owlsSinceExport;

    // Populate raw data
    document.getElementById("raw-max-quota").textContent = `${formatBytes(browserMaxQuota)}`;
    document.getElementById("raw-user-quota").textContent = `${formatBytes(userSetQuota)}`;
    document.getElementById("raw-total-used").textContent = `${formatBytes(totalStorageUsed)}`;
    document.getElementById("raw-indexeddb-used").textContent = `${formatBytes(indexedDBUsed)}`;
    document.getElementById("raw-available-storage").textContent = `${formatBytes(browserAvailableSpace)}`;
    document.getElementById("raw-percent-max-used").textContent = `${percentMaxQuotaUsed}%`;
    document.getElementById("raw-percent-user-used").textContent = `${percentUserQuotaUsed}%`;
    document.getElementById("raw-percent-indexeddb-browser").textContent = `${percentIndexedDBBrowserUsed}%`;
    document.getElementById("raw-owl-count").textContent = savedOwlCount;
    document.getElementById("raw-avg-storage-per-owl").textContent = `${formatBytes(avgStoragePerOwl)}`;
    document.getElementById("raw-more-owls").textContent = moreOwlsCanBeSaved;
    document.getElementById("raw-backup-size").textContent = `${formatBytes(estimatedBackupSize)}`;
    document.getElementById("raw-owls-since-backup").textContent = owlsSinceLastBackup;
});
