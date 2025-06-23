// ==UserScript==
// @name        TwSubLine
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        「X」のタイムライン上のリンクをサブウインドウ表示
// @author        Everyone
// @match        https://x.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=x.com
// @grant        none
// @updateURL        https://github.com/personwritep/TwSubLine/raw/main/TwSubLine.user.js
// @downloadURL        https://github.com/personwritep/TwSubLine/raw/main/TwSubLine.user.js
// ==/UserScript==



subline();


function subline(){
    let win_search=location.search;
    if(win_search.includes('tsl=subline')){

        let style=
            '<style class="subline">'+
            'header[role="banner"] { display: none; } '+
            'main { margin-left: 15px !important; } '+
            '[data-testid="sidebarColumn"] { display: none; }'+
            '</style>';

        if(!document.querySelector('.subline')){
            document.body.insertAdjacentHTML('beforeend', style); }}

} // subline()




document.addEventListener('click', function(event){
    if(event.shiftKey){
        event.preventDefault();
        link_pointer(event); }});


setTimeout(()=>{
    let layers=document.querySelector('#layers');
    let monitor=new MutationObserver(card_ck);
    monitor.observe(layers, { childList: true });
}, 200);


function card_ck(){
    let card=document.querySelector('[data-testid="hoverCardParent"]');
    if(card){
        card.addEventListener('click', function(event){
            if(event.shiftKey){
                event.preventDefault();
                link_pointer(event); }});
    }} // card_ck()




function link_pointer(event){
    let elem=document.elementFromPoint(event.clientX, event.clientY);
    if(elem){
        let link_a=elem.closest('a');
        if(link_a){
            event.preventDefault();
            event.stopImmediatePropagation();
            let link_url=link_a.getAttribute('href');
            open_link(link_url);
        }}}


function open_link(link){
    if(link.startsWith('/')){
        let url;
        let link_p=link.split('?');
        if(link_p.length==1){
            url='https://x.com'+ link + '?tsl=subline'; }
        else if(link_p.length==2){
            url='https://x.com'+ link + '&tsl=subline'; }

        window.open( url, null, 'top=20, left=0, width=640, height=800'); }

} //open_link()
