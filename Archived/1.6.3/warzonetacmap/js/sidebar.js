
function showSidebar(){
    let sidebar = document.getElementById("sidebar");
    if(!sidebar.classList.contains('sidebar-open')){
        sidebar.classList.add('sidebar-open');
        saveSidebarState(true);
    }
}

function hideSidebar(){
    let sidebar = document.getElementById("sidebar");
    if(sidebar.classList.contains('sidebar-open')){
        sidebar.classList.remove('sidebar-open');
        saveSidebarState(false);
    }
}

function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("sidebar-open");
    saveSidebarState(!sidebar.classList.contains('sidebar-open'));
}

function saveSidebarState(state){
    localStorage.setItem('wtmSidebarOpen', state);
}

function loadSidebarState(){
    let state = localStorage.getItem('wtmSidebarOpen') !== null ? localStorage.getItem('wtmSidebarOpen') : 'true';
    if(state === 'true') {
        showSidebar();
    } else {
        hideSidebar();
    }

}

loadSidebarState();

document.getElementById('sidebar-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.contains('sidebar-open') ? hideSidebar() : showSidebar();
});