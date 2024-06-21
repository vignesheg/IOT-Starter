import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { getDatabase, onValue, set, ref, update } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAHtiOV5siUAVNkIJzLOxrpp4oIXfeJbII",
    authDomain: "water-leve.firebaseapp.com",
    databaseURL: "https://water-leve-default-rtdb.firebaseio.com",
    projectId: "water-leve",
    storageBucket: "water-leve.appspot.com",
    messagingSenderId: "362296123564",
    appId: "1:362296123564:web:5d6e69786af6a00e9eff09",
    measurementId: "G-W449WVX1QZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Reference to the mode data
const modeRef = ref(db, "mode");

// Listen for changes to the mode data
onValue(ref(db), (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    if (data) {
        const mode1 = data.mode;
        const mode2 = data.cond;
        if (mode1 === 2 || mode2 === 1 || mode1 == 1) {
            $('#indicator').text('ON').removeClass('off').addClass('on');
        } else {
            $('#indicator').text('OFF').removeClass('on').addClass('off');
        }

    }
});

// Add click event listeners to the buttons
$('#mode1Btn').click(function () {
    update(ref(db), {
        mode: 2,
        cond:1
    });
    $(this).addClass('glow');
    $('#mode2Btn').removeClass('glow');
    $('#offBtn').removeClass('glow');
});

$('#mode2Btn').click(function () {
    update(ref(db), {
        mode: 1
    });
    $(this).addClass('glow');
    $('#mode1Btn').removeClass('glow');
    $('#offBtn').removeClass('glow');
});

$('#offBtn').click(function () {
    update(ref(db), {
        mode: 0,
        cond:0
    });
    $(this).addClass('glow');
    $('#mode1Btn').removeClass('glow');
    $('#mode2Btn').removeClass('glow');
});
