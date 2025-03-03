export function loadProfile(id, display) {
    return fetch("./json/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error while loading data.json");
            }
            return response.json();
        })
        .then(data => {
            // Find the user with the given id
            console.log("Loading user :", id, "...");
            const user = data.find(profile => profile.id === id);
            
            if (!user) {
                console.error("Cannot find user id :", id);
                return null;
            } else {
                console.log("User found :", user);
            }

            console.log("Extracting data :", user.id, "...");
            // Extract user data
            let name = user.name;
            let username = user.username;
            let email = user.email;
            let motherTongue = user.motherTongue;
            let language = user.language;
            let level = user.level;
            let achievements = user.achievements;
            console.log("Loaded profile :", { name, username, email, motherTongue, language, level, achievements });

            if (display) {
                displayProfile(name, username, email, language, level, achievements);
            }

            return user;
        })
        .catch(error => {
            console.error("Erreur :", error);
            return null;
        });
}

export function displayProfile(name, username, email, language, level, achievements) {
    console.log("Displaying profile...");

    // Updating profile info
    document.querySelector(".profile-info p:nth-of-type(1)").textContent += name;
    document.querySelector(".profile-info p:nth-of-type(2)").textContent += username;
    document.querySelector(".profile-info p:nth-of-type(3)").textContent += email;
    document.querySelector(".profile-info p:nth-of-type(4)").textContent += language;
    document.querySelector(".profile-info p:nth-of-type(5)").textContent += level;

    // Updating achievements list
    const achievementsList = document.querySelector(".achievements");
    achievementsList.innerHTML = "";
    achievements.forEach(ach => {
        let li = document.createElement("li");
        li.className = "achievement-card neon-purple-border";
        li.textContent = ach;
        achievementsList.appendChild(li);
    });
    console.log("Profile displayed.");
}