/* =====================================================
   FIXITLOCAL - JAVASCRIPT
   ===================================================== */


/* ================= SAMPLE PROBLEMS ================= */

let problems = [

    {
        title: "Broken Streetlight",
        category: "Streetlight",
        location: "Main Road, Kothrud",
        description:
            "The streetlight near the main road has not been working for several days.",
        reporter: "Rahul",
        status: "In Progress",
        date: "25 Sep 2026"
    },

    {
        title: "Garbage Not Collected",
        category: "Garbage",
        location: "Market Area",
        description:
            "Garbage has been accumulating near the market area and has not been collected regularly.",
        reporter: "Priya",
        status: "Reported",
        date: "24 Sep 2026"
    },

    {
        title: "Large Pothole",
        category: "Road",
        location: "College Road",
        description:
            "A large pothole has appeared on the road and is making it difficult for vehicles to pass safely.",
        reporter: "Aman",
        status: "Resolved",
        date: "20 Sep 2026"
    },

    {
        title: "Water Leakage",
        category: "Water",
        location: "Station Road",
        description:
            "Water is continuously leaking from a damaged pipe near the roadside.",
        reporter: "Sneha",
        status: "In Progress",
        date: "22 Sep 2026"
    },

    {
        title: "Damaged Public Bench",
        category: "Public Property",
        location: "Community Park",
        description:
            "One of the public benches in the park is damaged and needs repair.",
        reporter: "Vikram",
        status: "Reported",
        date: "21 Sep 2026"
    },

    {
        title: "Electricity Issue",
        category: "Electricity",
        location: "Green Park",
        description:
            "An electrical box near the residential area appears to be damaged.",
        reporter: "Neha",
        status: "Resolved",
        date: "18 Sep 2026"
    }

];


/* ================= DISPLAY PROBLEMS ================= */

function displayProblems(list = problems) {

    const problemList =
        document.getElementById("problemList");

    problemList.innerHTML = "";


    if (list.length === 0) {

        problemList.innerHTML = `
            <div class="no-problems">
                <h3>No problems found</h3>
                <p>
                    Try changing your search or category filter.
                </p>
            </div>
        `;

        return;
    }


    list.forEach((problem) => {

        const card =
            document.createElement("div");

        card.className = "problem-card";


        const statusClass =
            problem.status
                .toLowerCase()
                .replace(" ", "-");


        card.innerHTML = `

            <div class="problem-top">

                <span class="category-badge">
                    ${problem.category}
                </span>

                <span class="status ${statusClass}">
                    ${problem.status}
                </span>

            </div>


            <h3>
                ${problem.title}
            </h3>


            <div class="problem-location">
                📍 ${problem.location}
            </div>


            <p class="problem-description">
                ${problem.description}
            </p>


            <div class="problem-footer">

                <span>
                    👤 ${problem.reporter}
                </span>

                <span>
                    ${problem.date}
                </span>

            </div>

        `;


        problemList.appendChild(card);

    });

}


/* ================= UPDATE STATISTICS ================= */

function updateStatistics() {

    const total =
        problems.length;


    const inProgress =
        problems.filter(
            problem =>
                problem.status === "In Progress"
        ).length;


    const resolved =
        problems.filter(
            problem =>
                problem.status === "Resolved"
        ).length;


    document.getElementById("totalProblems")
        .textContent = total;


    document.getElementById("inProgressProblems")
        .textContent = inProgress;


    document.getElementById("resolvedProblems")
        .textContent = resolved;


    document.getElementById("heroReported")
        .textContent = total;


    document.getElementById("heroResolved")
        .textContent = resolved;

}


/* ================= FORM SUBMISSION ================= */

const problemForm =
    document.getElementById("problemForm");


problemForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const title =
            document.getElementById("problemTitle")
                .value.trim();


        const category =
            document.getElementById("category")
                .value;


        const location =
            document.getElementById("location")
                .value.trim();


        const reporter =
            document.getElementById("reporterName")
                .value.trim();


        const description =
            document.getElementById("description")
                .value.trim();


        const image =
            document.getElementById("image");


        if (
            !title ||
            !category ||
            !location ||
            !reporter ||
            !description
        ) {

            alert(
                "Please fill in all required fields."
            );

            return;
        }


        const newProblem = {

            title: title,

            category: category,

            location: location,

            description: description,

            reporter: reporter,

            status: "Reported",

            date: getCurrentDate()

        };


        problems.unshift(newProblem);


        displayProblems();

        updateStatistics();


        problemForm.reset();


        alert(
            "Your problem has been successfully reported!"
        );


        document
            .getElementById("problems")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


/* ================= CURRENT DATE ================= */

function getCurrentDate() {

    const date = new Date();

    const day =
        String(date.getDate())
            .padStart(2, "0");

    const monthNames = [

        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"

    ];

    const month =
        monthNames[date.getMonth()];

    const year =
        date.getFullYear();


    return `${day} ${month} ${year}`;

}


/* ================= SEARCH ================= */

const searchProblem =
    document.getElementById("searchProblem");


searchProblem.addEventListener(
    "input",
    filterProblems
);


/* ================= CATEGORY FILTER ================= */

const filterCategory =
    document.getElementById("filterCategory");


filterCategory.addEventListener(
    "change",
    filterProblems
);


/* ================= FILTER FUNCTION ================= */

function filterProblems() {

    const searchText =
        searchProblem
            .value
            .toLowerCase()
            .trim();


    const selectedCategory =
        filterCategory.value;


    const filtered =
        problems.filter(
            problem => {

                const matchesSearch =

                    problem.title
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    problem.location
                        .toLowerCase()
                        .includes(searchText)

                    ||

                    problem.description
                        .toLowerCase()
                        .includes(searchText);


                const matchesCategory =

                    selectedCategory === "All"

                    ||

                    problem.category ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayProblems(filtered);

}


/* ================= INITIAL LOAD ================= */

displayProblems();

updateStatistics();