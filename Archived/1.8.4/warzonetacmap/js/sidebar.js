
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


// ============================================
// function showMapSettings(){
//     let settings = document.getElementById("map-settings-wrap");
//     if(!settings.classList.contains('open')){
//         settings.classList.add('open');
//         saveMapSettingsState(true);
//     }
// }

// function hideMapSettings(){
//     let settings = document.getElementById("map-settings-wrap");
//     if(settings.classList.contains('open')){
//         settings.classList.remove('open');
//         saveMapSettingsState(false);
//     }
// }

// function toggleMapSettings() {
//     let settings = document.getElementById("map-settings-wrap");
//     settings.classList.toggle("open");
//     saveMapSettingsState(!settings.classList.contains('open'));
// }

// function saveMapSettingsState(state){
//     localStorage.setItem('wtm-mapSettingsOpen', state);
// }

// function loadMapSettingsState(){
//     let state = localStorage.getItem('wtm-mapSettingsOpen') !== null ? localStorage.getItem('wtm-mapSettingsOpen') : 'true';
//     if(state === 'true') {
//         showMapSettings();
//     } else {
//         hideMapSettings();
//     }

// }

// loadMapSettingsState();


// document.getElementById('map-settings-btn').addEventListener('click', () => {
//     document.getElementById('map-settings-wrap').classList.contains('open') ? hideMapSettings() : showMapSettings();
// });

// ============================================
let sidebar = document.getElementById('sidebar');

sidebar.addEventListener('click', e => {
    if(!e.target.classList.contains('sidebar-layers-wrap-btn')) return;
    
    let btn = e.target;
    
    btn.parentNode.classList.contains('open') ? btn.parentNode.classList.remove('open') : btn.parentNode.classList.add('open');
});

// ============================================
function rangeSlider() {
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--min', e.min == '' ? '0' : e.min);
        e.style.setProperty('--max', e.max == '' ? '100' : e.max);
        e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
}
rangeSlider();