document.addEventListener('DOMContentLoaded', ()=> {

    const topRadios = document.querySelectorAll('.comp1')
    const bottomRadios = document.querySelectorAll('.comp2')
    topRadios.forEach(element => {
        element.addEventListener('change', ()=>{
            const check = document.getElementById('check1')
            check.classList.remove('hide-comp')
        })
    });
    bottomRadios.forEach(element => {
        element.addEventListener('change', ()=>{
            const check = document.getElementById('check2')
            check.classList.remove('hide-comp')
        })
    });

    const tab1 = document.getElementById('tab-btn-1')
    const tab2 = document.getElementById('tab-btn-2')

    const tab1Label = document.getElementById('tab1-label')
    const tab2Label = document.getElementById('tab2-label')
    const tab1Content = document.getElementById('content-1')
    const tab2Content = document.getElementById('content-2')
    tab1.addEventListener('change', ()=>{
        if(tab1.checked){
            tab2Content.classList.add('hide')
            tab2Label.classList.add('disabled')
            tab1Label.classList.remove('disabled')
            tab1Content.classList.remove('hide')
        }else{
            tab1Content.classList.add('hide')
            tab2Content.classList.remove('hide')
            tab2Label.classList.remove('disabled')
            tab1Label.classList.add('disabled')
        }
    })
    tab2.addEventListener('change', ()=>{
        if(tab1.checked){
            tab2Content.classList.add('hide')
            tab2Label.classList.add('disabled')
            tab1Label.classList.remove('disabled')
            tab1Content.classList.remove('hide')
        }else{
            tab1Content.classList.add('hide')
            tab2Content.classList.remove('hide')
            tab2Label.classList.remove('disabled')
            tab1Label.classList.add('disabled')
        }
    })
    
})