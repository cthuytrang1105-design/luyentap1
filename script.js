/* =========================================
   PHẦN TỬ
========================================= */

const slotsArea =
    document.getElementById("slotsArea");

const addSlotBtn =
    document.getElementById("addSlotBtn");

const clearAllBtn =
    document.getElementById("clearAllBtn");

const checkBtn =
    document.getElementById("checkBtn");

const resetBtn =
    document.getElementById("resetBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const customInput =
    document.getElementById("customInput");

const customType =
    document.getElementById("customType");

const addCustomBtn =
    document.getElementById("addCustomBtn");

const customCards =
    document.getElementById("customCards");

const toast =
    document.getElementById("toast");

const successOverlay =
    document.getElementById("successOverlay");

const closeSuccessBtn =
    document.getElementById("closeSuccessBtn");


let selectedSlot = null;

let draggedValue = null;

let draggedPlacedCard = null;


/* =========================================
   ĐÁP ÁN
========================================= */

/*

n = 10
S = 0
for k in range(n):
    if k % 2 == 0:
        S = S + k
print(S)

*/

const correctProgram = [

    [
        "n",
        "=",
        "10"
    ],

    [
        "S",
        "=",
        "0"
    ],

    [
        "for",
        "k",
        "in",
        "range",
        "(",
        "n",
        ")",
        ":"
    ],

    [
        "if",
        "k",
        "%",
        "2",
        "==",
        "0",
        ":"
    ],

    [
        "S",
        "=",
        "S",
        "+",
        "k"
    ],

    [
        "print",
        "(",
        "S",
        ")"
    ]

];


/* =========================================
   LẤY DANH SÁCH KHAY
========================================= */

function getSlots() {

    return [
        ...document.querySelectorAll(
            ".code-slot"
        )
    ];

}


/* =========================================
   CHỌN KHAY
========================================= */

function selectSlot(slot) {

    getSlots().forEach(
        function (item) {

            item.classList.remove(
                "active-slot"
            );

        }
    );


    slot.classList.add(
        "active-slot"
    );


    selectedSlot =
        slot;

}


/* =========================================
   CẬP NHẬT SỐ THỨ TỰ
========================================= */

function updateSlotNumbers() {

    getSlots().forEach(
        function (
            slot,
            index
        ) {

            slot.dataset.index =
                index;

            slot
                .querySelector(
                    ".slot-number"
                )
                .textContent =
                index + 1;

        }
    );

}


/* =========================================
   PLACEHOLDER
========================================= */

function updatePlaceholder(slot) {

    const content =
        slot.querySelector(
            ".slot-content"
        );


    const cards =
        content.querySelectorAll(
            ".placed-card"
        );


    let placeholder =
        content.querySelector(
            ".slot-placeholder"
        );


    if (
        cards.length === 0
    ) {

        if (!placeholder) {

            placeholder =
                document.createElement(
                    "span"
                );

            placeholder.className =
                "slot-placeholder";

            placeholder.textContent =
                "Thả thẻ vào đây...";

            content.appendChild(
                placeholder
            );

        }

    } else {

        if (placeholder) {

            placeholder.remove();

        }

    }

}


/* =========================================
   TẠO THẺ ĐƯỢC THẢ
========================================= */

function createPlacedCard(value) {

    const card =
        document.createElement(
            "span"
        );


    card.className =
        "placed-card";


    card.textContent =
        value;


    card.dataset.value =
        value;


    card.draggable =
        true;


    /* XÓA KHI BẤM */

    card.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const slot =
                card.closest(
                    ".code-slot"
                );


            card.remove();


            updatePlaceholder(
                slot
            );

        }
    );


    /* KÉO */

    card.addEventListener(
        "dragstart",
        function () {

            draggedPlacedCard =
                card;

            draggedValue =
                null;


            setTimeout(
                function () {

                    card.style.opacity =
                        "0.35";

                },
                0
            );

        }
    );


    card.addEventListener(
        "dragend",
        function () {

            card.style.opacity =
                "1";

            draggedPlacedCard =
                null;


            getSlots().forEach(
                updatePlaceholder
            );

        }
    );


    return card;

}


/* =========================================
   THÊM THẺ VÀO KHAY
========================================= */

function addCardToSlot(
    slot,
    value
) {

    if (!slot) {

        slot =
            selectedSlot ||
            getSlots()[0];

    }


    const content =
        slot.querySelector(
            ".slot-content"
        );


    const placeholder =
        content.querySelector(
            ".slot-placeholder"
        );


    if (placeholder) {

        placeholder.remove();

    }


    content.appendChild(
        createPlacedCard(
            value
        )
    );


    selectSlot(
        slot
    );

}


/* =========================================
   GẮN SỰ KIỆN CHO KHAY
========================================= */

function setupSlot(slot) {

    /* CHỌN */

    slot.addEventListener(
        "click",
        function () {

            selectSlot(
                slot
            );

        }
    );


    /* DRAG OVER */

    slot.addEventListener(
        "dragover",
        function (event) {

            event.preventDefault();


            slot.classList.add(
                "drag-over"
            );

        }
    );


    /* DRAG LEAVE */

    slot.addEventListener(
        "dragleave",
        function () {

            slot.classList.remove(
                "drag-over"
            );

        }
    );


    /* DROP */

    slot.addEventListener(
        "drop",
        function (event) {

            event.preventDefault();


            slot.classList.remove(
                "drag-over"
            );


            selectSlot(
                slot
            );


            if (
                draggedPlacedCard
            ) {

                const oldSlot =
                    draggedPlacedCard.closest(
                        ".code-slot"
                    );


                const content =
                    slot.querySelector(
                        ".slot-content"
                    );


                const placeholder =
                    content.querySelector(
                        ".slot-placeholder"
                    );


                if (placeholder) {

                    placeholder.remove();

                }


                content.appendChild(
                    draggedPlacedCard
                );


                updatePlaceholder(
                    oldSlot
                );


                updatePlaceholder(
                    slot
                );


                return;

            }


            if (
                draggedValue !== null
            ) {

                addCardToSlot(
                    slot,
                    draggedValue
                );

            }

        }
    );


    /* XÓA THẺ TRONG DÒNG */

    slot
        .querySelector(
            ".clear-line"
        )
        .addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                slot
                    .querySelectorAll(
                        ".placed-card"
                    )
                    .forEach(
                        function (card) {

                            card.remove();

                        }
                    );


                updatePlaceholder(
                    slot
                );

            }
        );


    /* XÓA KHAY */

    slot
        .querySelector(
            ".delete-line"
        )
        .addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                if (
                    getSlots().length <= 1
                ) {

                    showToast(
                        "Phải còn ít nhất 1 khay."
                    );

                    return;

                }


                slot.remove();


                updateSlotNumbers();


                const slots =
                    getSlots();


                if (
                    !slots.includes(
                        selectedSlot
                    )
                ) {

                    selectSlot(
                        slots[0]
                    );

                }

            }
        );


    /* DI CHUYỂN TRÁI = LÙI 1 DÒNG */

    slot
        .querySelector(
            ".move-left"
        )
        .addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const previous =
                    slot.previousElementSibling;


                if (
                    previous &&
                    previous.classList.contains(
                        "code-slot"
                    )
                ) {

                    slotsArea.insertBefore(
                        slot,
                        previous
                    );


                    updateSlotNumbers();

                }

            }
        );


    /* DI CHUYỂN PHẢI = XUỐNG 1 DÒNG */

    slot
        .querySelector(
            ".move-right"
        )
        .addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const next =
                    slot.nextElementSibling;


                if (
                    next &&
                    next.classList.contains(
                        "code-slot"
                    )
                ) {

                    slotsArea.insertBefore(
                        next,
                        slot
                    );


                    updateSlotNumbers();

                }

            }
        );

}


/* =========================================
   GẮN KHAY BAN ĐẦU
========================================= */

getSlots().forEach(
    setupSlot
);


selectedSlot =
    getSlots()[1] ||
    getSlots()[0];


/* =========================================
   GẮN SỰ KIỆN CHO THẺ
========================================= */

function setupSourceCard(card) {

    card.draggable =
        true;


    /* BẤM */

    card.addEventListener(
        "click",
        function () {

            addCardToSlot(
                selectedSlot,
                card.dataset.value
            );

        }
    );


    /* KÉO */

    card.addEventListener(
        "dragstart",
        function () {

            draggedValue =
                card.dataset.value;

            draggedPlacedCard =
                null;

        }
    );


    card.addEventListener(
        "dragend",
        function () {

            draggedValue =
                null;

        }
    );

}


document
    .querySelectorAll(
        ".code-card"
    )
    .forEach(
        setupSourceCard
    );


/* =========================================
   TẠO KHAY MỚI
========================================= */

function createNewSlot() {

    const slot =
        document.createElement(
            "div"
        );


    slot.className =
        "code-slot";


    slot.innerHTML =
        `
        <div class="slot-number"></div>

        <div class="slot-content">
            <span class="slot-placeholder">
                Thả thẻ vào đây...
            </span>
        </div>

        <div class="slot-controls">

            <div class="control-row">

                <button class="move-left">
                    ←
                </button>

                <button class="move-right">
                    →
                </button>

            </div>

            <div class="control-row">

                <button class="clear-line">
                    ⌫
                </button>

                <button class="delete-line">
                    ×
                </button>

            </div>

        </div>
        `;


    slotsArea.appendChild(
        slot
    );


    setupSlot(
        slot
    );


    updateSlotNumbers();


    selectSlot(
        slot
    );

}


/* =========================================
   THÊM KHAY
========================================= */

addSlotBtn.addEventListener(
    "click",
    createNewSlot
);


/* =========================================
   XÓA TẤT CẢ THẺ
========================================= */

clearAllBtn.addEventListener(
    "click",
    function () {

        getSlots().forEach(
            function (slot) {

                slot
                    .querySelectorAll(
                        ".placed-card"
                    )
                    .forEach(
                        function (card) {

                            card.remove();

                        }
                    );


                updatePlaceholder(
                    slot
                );

            }
        );

    }
);


/* =========================================
   LẤY CHƯƠNG TRÌNH
========================================= */

function getCurrentProgram() {

    return getSlots()
        .map(
            function (slot) {

                return [
                    ...slot.querySelectorAll(
                        ".placed-card"
                    )
                ]
                    .map(
                        function (card) {

                            return card.dataset.value;

                        }
                    );

            }
        )
        .filter(
            function (row) {

                return row.length > 0;

            }
        );

}


/* =========================================
   SO SÁNH
========================================= */

function programIsCorrect(
    current
) {

    return (
        JSON.stringify(
            current
        ) ===
        JSON.stringify(
            correctProgram
        )
    );

}


/* =========================================
   KIỂM TRA
========================================= */

checkBtn.addEventListener(
    "click",
    function () {

        const current =
            getCurrentProgram();


        if (
            current.length === 0
        ) {

            showToast(
                "Bạn chưa xếp thẻ nào!"
            );

            return;

        }


        if (
            programIsCorrect(
                current
            )
        ) {

            successOverlay
                .classList
                .add(
                    "show"
                );

        } else {

            showToast(
                "Chưa chính xác. Hãy kiểm tra lại thứ tự các thẻ nhé!"
            );

            shakePanel();

        }

    }
);


/* =========================================
   RUNG PANEL KHI SAI
========================================= */

function shakePanel() {

    const panel =
        document.querySelector(
            ".program-panel"
        );


    panel.animate(
        [

            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-6px)"
            },

            {
                transform:
                    "translateX(6px)"
            },

            {
                transform:
                    "translateX(-4px)"
            },

            {
                transform:
                    "translateX(4px)"
            },

            {
                transform:
                    "translateX(0)"
            }

        ],

        {
            duration:
                350
        }
    );

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(text) {

    clearTimeout(
        toastTimer
    );


    toast.textContent =
        text;


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =========================================
   POPUP
========================================= */

closeSuccessBtn.addEventListener(
    "click",
    function () {

        successOverlay
            .classList
            .remove(
                "show"
            );

    }
);


successOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            successOverlay
        ) {

            successOverlay
                .classList
                .remove(
                    "show"
                );

        }

    }
);


/* =========================================
   TỰ TẠO THẺ
========================================= */

function createCustomCard() {

    const value =
        customInput
            .value
            .trim();


    if (
        value === ""
    ) {

        return;

    }


    const card =
        document.createElement(
            "button"
        );


    card.className =
        "code-card " +
        customType.value;


    card.dataset.value =
        value;


    card.textContent =
        value;


    customCards.appendChild(
        card
    );


    setupSourceCard(
        card
    );


    customInput.value =
        "";


    customInput.focus();

}


addCustomBtn.addEventListener(
    "click",
    createCustomCard
);


customInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            createCustomCard();

        }

    }
);


/* =========================================
   TOÀN MÀN HÌNH
========================================= */

fullscreenBtn.addEventListener(
    "click",
    async function () {

        try {

            if (
                !document.fullscreenElement
            ) {

                await document
                    .documentElement
                    .requestFullscreen();

            } else {

                await document
                    .exitFullscreen();

            }

        } catch (error) {

            console.log(
                error
            );

        }

    }
);


document.addEventListener(
    "fullscreenchange",
    function () {

        if (
            document.fullscreenElement
        ) {

            fullscreenBtn.textContent =
                "✕ Thoát toàn màn hình";

        } else {

            fullscreenBtn.textContent =
                "⛶ Toàn màn hình";

        }

    }
);


/* =========================================
   LÀM LẠI
========================================= */

resetBtn.addEventListener(
    "click",
    function () {

        location.reload();

    }
);