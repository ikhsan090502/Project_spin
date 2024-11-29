document.addEventListener('DOMContentLoaded', function() {
    const spinButton = document.getElementById('spin-button');
    const wheel = document.getElementById('wheel');
    const popup = document.querySelector('.popup');
    const popupIcon = document.getElementById('popup-icon');
    const wallpaper = document.createElement('div');
    wallpaper.className = 'wallpaper';
    document.body.appendChild(wallpaper);

    const items = [
        { name: 'korek', icon: 'images/korek.gif', remaining: 1000  },
        { name: 'mug', icon: 'images/mug.gif', remaining: 0 },
        { name: 'asbak', icon: 'images/asbak.gif', remaining: 0 },
        { name: 'topi', icon: 'images/topi.gif', remaining: 3 },
        { name: 'baju', icon: 'images/baju.gif', remaining: 1 }
        
    ];

    const sequence = [
        'baju', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek', 
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek',
       'korek', 'korek', 'korek', 'korek', 'korek'
    ];

    let spinCount = 0;
    let sequenceIndex = 0;

    function spinWheel() {
        const startAngle = Math.floor(Math.random() * 360);
        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${startAngle + 3600}deg)`;

        setTimeout(() => {
            wheel.style.transition = 'none';
            const stopAngle = startAngle % 360;
            wheel.style.transform = `rotate(${stopAngle}deg)`;

            let selectedItem;

            if (sequenceIndex >= sequence.length) {
                sequenceIndex = 0;  // Mengulangi sequence dari awal
            }

            const itemName = sequence[sequenceIndex];
            selectedItem = items.find(item => item.name === itemName && item.remaining > 0);
            sequenceIndex++;

            if (!selectedItem) {
                selectedItem = items.find(item => item.name === 'Zonk');
            }

            selectedItem.remaining--;

            console.log(`Icon: ${selectedItem.icon}`);

            popupIcon.style.backgroundImage = `url(${selectedItem.icon})`;
            popup.style.display = 'flex';

            setTimeout(() => {
                popup.style.display = 'none';
            }, 5000);

            spinCount++;
        }, 4000);
    }

    let idleTimer;
    const idleTimeout = 30000;

    function resetIdleTimer() {
        console.log('Reset idle timer');
        clearTimeout(idleTimer);
        wallpaper.style.display = 'none';
        idleTimer = setTimeout(() => {
            console.log('Showing wallpaper');
            wallpaper.style.display = 'flex';
        }, idleTimeout);
    }

    document.addEventListener('mousemove', resetIdleTimer);
    document.addEventListener('keydown', resetIdleTimer);
    document.addEventListener('click', resetIdleTimer);

    wallpaper.addEventListener('click', function() {
        wallpaper.style.display = 'none';
        resetIdleTimer();
    });

    resetIdleTimer();

    spinButton.addEventListener('click', spinWheel);

    popup.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
});
