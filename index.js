const keysbutt = document.querySelectorAll('.key');

keysbutt.forEach(key => {
    key.addEventListener('pointerdown', e => {
        // play sound
        const audio = document.querySelector(`audio[data-key="${key.dataset.key}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();

        // add dot
        const dot = document.createElement('div')
        dot.classList.add('dot')
        dot.id = e.pointerId
        positionDot(e, dot)
        document.body.append(dot)
    })

    key.addEventListener('pointermove', e => {
        const dot = document.getElementById(e.pointerId)
        if (dot == null) return
        positionDot(e, dot)
    })
    key.addEventListener('pointerup', e => {
        const dot = document.getElementById(e.pointerId)
        if (dot == null) return
        dot.remove()
    })
    key.addEventListener('pointercancel', e => {
        const dot = document.getElementById(e.pointerId)
        if (dot == null) return
        dot.remove()
    })
})


function positionDot(e, dot) {
    dot.style.width = `${e.width * 2}px`
    dot.style.height = `${e.height * 2}px`
    dot.style.left = `${e.pageX}px`
    dot.style.top = `${e.pageY}px`
}


function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return; //stop function from running if no audio is available
    audio.currentTime = 0; //rewind start time
    audio.play();
    key.classList.add('playing');
};

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);