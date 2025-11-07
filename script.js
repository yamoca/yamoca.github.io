// Portfolio content
const portfolioData = {
    about: `
Hi, I'm Leo. 

I'm a curious and motivated student excited to apply my technical and personal skills to real world projects. 
With a deep interest in computer science, I approach challenges analytically and enjoy using my logical problem-solving skills to design practical and elegant solutions.

When I'm not coding, you can find me playing rugby, practicing Taekwondo or leading Cadets
(but usually doing maths homework) 
`,

    skills: [{
        category: "Programming Languages",
        items: ["Python", "C#", "Rust", "Javascript", "HTML/CSS", "SQL"]
    },
    {
        category: "Tools and Technologies",
        items: ["Linux", "Git", "GitHub", "VirtualBox"]
    },
    ],

    projects: [{
        title: "Bloop",
        description: `A short puzzle video game created for black and white jam #8. 
- I did the programming, art and gamedesign myself, and was voted 8th in originality out of 350 games`, 
        tech: "C#, Unity, Aseprite",
        link: "<a href='https://yamoca.itch.io/bloop' target='_blank'>yamoca.itch.io/bloop</a>"
    },
    {
        title: "Brainf*ck interpreter",
        description: `-Designed and implemented a simple interpreter for the esoteric Brainf*ck programming language.
- Simulated memory, pointers and implemented control flow logic`, 
        tech: "Python",
        link: "NEED TO UPDATE GITHUB"
    },
    {
        title: "Latin Flashcard App (in progress)",
        description: `Developing a flashcard application to help my own Latin studies, as well as other school pupils.

- What makes it different: Latin, like many languages, has a complex system of declensions and conjugations, and I am developing a system to programmatically generate families of words to help students with their grammar, not just their vocabulary.

- I've enjoyed designing and iterating the database schemas to effectively relate the grouped data together

- Learned much about <strong>webserver architecture</strong> and <strong>API</strong> design by focussing on the backend first

- Explored many different technologies and stacks to find the best approach, balancing learning with making progress`,

        tech: "Python, sqlite, Rust, HTMX, Askama, Axum",
        link: "As the project has gone through many iterations (and my git skills were poor - I probably should have used branches!), the code is scattered across various repositories. Anything in my github profile with 'flashcards' or 'latin' in the repo name will be related."
    }
    ],

    experience: [{
        position: "Work Experience Participant",
        company: "MBDA",
        period: "February 2025",
        description: `Completed a one-week work experience placement at MBDA, a leading defence company.

- Designed a weapon system to neutralise an enemy satellite with the key constraint of creating zero space debris, winning the <strong>award for the best group project</strong>.

- Engaged with a variety of presentations from different areas of the business including <strong>system design</strong>, <strong>cybersecurity</strong>, <strong>computer vision</strong> and <strong>machine learning</strong>, and an eye opening session on how to think innovatively.`
    },
    {
        position: "Summer Programme",
        company: "Palantir Technologies",
        period: "August 2025",
        description: `Selected from <strong>over 1000 applicants</strong> to attended a week-long summer programme at Palantir Technologies.

- Designed and implemented ETL pipelines on large datasets in Palantir's <strong>Pipeline Builder</strong> to prepare the data for analysis in <strong>Contour</strong>.

- Used <strong>Palantir Foundry</strong> and <strong>Typescript</strong> to create a dashboard displaying key information about potential threats posed by different viruses as well as the status of the supply chains for various vaccines using the transformed datasets.

- Engaged in discussions surrounding the ethics of privacy and security and how companies can collaborate with governments to tackle global issues.`
    }
    ],
        
    contact: {
        email: "leojwgulliver@gmail.com",
        github: "<a href='https://github.com/yamoca'>github.com/yamoca</a>",
        linkedin: "<a href='https://linkedin.com/in/leo-gulliver'>linkedin.com/in/leo-gulliver</a>"
    }
};

// Command handling
const commands = {
    help: () => {
        return `
Available commands:
  help        - Display this help message
  about       - About me
  skills      - My technical skills
  projects    - My portfolio projects
  experience  - My work experience
  contact     - How to reach me
  clear       - Clear the terminal
  theme       - Change the terminal theme (theme [name])
                Available themes: matrix, ubuntu, midnight, light
  echo [text] - Display the provided text
  ls          - List all sections
  cat [file]  - View a specific section
  cd [dir]    - Change directory 
  vim         - a text editor... enter if you dare 
  `;
    },

    about: () => {
        return portfolioData.about;
    },

    skills: () => {
        let output = "My Skills:\n\n";
        portfolioData.skills.forEach(category => {
            output += `【 ${category.category} 】\n`;
            output += category.items.join(", ") + "\n\n";
        });
        return output;
    },

    projects: () => {
        let output = "My Projects:\n\n";
        portfolioData.projects.forEach((project, index) => {
            output += `【 ${project.title} 】\n`;
            output += `${project.description}\n`;
            output += `<strong>Technologies</strong>: ${project.tech}\n`;
            output += `<strong>Link</strong>: ${project.link}\n\n`;
        });
        return output;
    },

    experience: () => {
        let output = "Work Experience:\n\n";
        portfolioData.experience.forEach(job => {
            output += `【 ${job.position} 】 @ ${job.company}\n`;
            output += `${job.period}\n`;
            output += `${job.description}\n\n`;
        });
        return output;
    },

    contact: () => {
        const contact = portfolioData.contact;
        return `
Contact Information:

Email   : ${contact.email}
LinkedIn: ${contact.linkedin}
GitHub  : ${contact.github}
`;
    },

    clear: () => {
        document.getElementById('output').innerHTML = '';
        return '';
    },

    ls: () => {
        return "Available sections:\n\nabout.txt\nskills.txt\nprojects.txt\nexperience.txt\neducation.txt\ncontact.txt";
    },

    cd: (args) => {
        if (!args || args.length === 0) {
            return "\n";
        }
        else if (args[0] === "..") {
            return "<span class=\"error\">Are you trying to leave? There's no escaping my portfolio! \n</span>";
        }
        else {
            return "<span class=\"error\">Where do you think you're going! \n</span>";
        }
    },

    cat: (args) => {
        if (!args || args.length === 0) {
            return "<span class=\"error\">Usage: cat [filename]</span>";
        }

        const file = args[0].toLowerCase().replace('.txt', '');
        if (['about', 'skills', 'projects', 'experience', 'education', 'contact'].includes(file)) {
            return commands[file]();
        } else {
            return `<span class="error">File not found: ${args[0]}</span>`;
        }
    },

    echo: (args) => {
        if (!args || args.length === 0) {
            return "";
        }
        return args.join(" ");
    },

    vim: (args) => {
        if (!args || args.length === 0) {
            return "Be careful, if you enter vim, make sure you know how to exit! To proceed, type 'vim --force'";
        } else if (args[0].toLowerCase() === '--force') {
            window.location.href = 'vim.html';
        }


    },

    theme: (args) => {
        if (!args || args.length === 0) {
            return "Usage: theme [name]\nAvailable themes: matrix, ubuntu, midnight, light";
        }

        const root = document.documentElement;
        const theme = args[0].toLowerCase();

        switch (theme) {
            case 'matrix':
                root.style.setProperty('--bg-color', '#0a0a0a');
                root.style.setProperty('--text-color', '#00ff00');
                root.style.setProperty('--prompt-color', '#00cc00');
                root.style.setProperty('--accent-color', '#33ff33');
                root.style.setProperty('--link-color', '#00aaff');
                return "Theme changed to Matrix";

            case 'ubuntu':
                root.style.setProperty('--bg-color', '#300a24');
                root.style.setProperty('--text-color', '#ffffff');
                root.style.setProperty('--prompt-color', '#ff7f00');
                root.style.setProperty('--accent-color', '#ffac7f');
                root.style.setProperty('--link-color', '#00aaff');
                return "Theme changed to Ubuntu";

            case 'midnight':
                root.style.setProperty('--bg-color', '#1a1a2e');
                root.style.setProperty('--text-color', '#e6e6ff');
                root.style.setProperty('--prompt-color', '#c2c2f0');
                root.style.setProperty('--accent-color', '#6a6acc');
                root.style.setProperty('--link-color', '#6acdcc');
                return "Theme changed to Midnight";

            case 'light':
                root.style.setProperty('--bg-color', '#f5f5f5');
                root.style.setProperty('--text-color', '#333333');
                root.style.setProperty('--prompt-color', '#0066cc');
                root.style.setProperty('--accent-color', '#0099ff');
                root.style.setProperty('--link-color', '#cc3300');
                return "Theme changed to Light";

            default:
                return `<span class="error">Unknown theme: ${theme}. Available themes: matrix, ubuntu, midnight, light</span>`;
        }
    }
};

// Initialize terminal functionality
document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');
    const currentPromptElement = document.getElementById('inputholder');

    // Command history functionality
    let commandHistory = [];
    let historyIndex = -1;

    // Auto complete commands
    const autoCompleteCommands = Object.keys(commands);

    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            const inputValue = inputElement.value.trim().toLowerCase();
            if (!inputValue) return;

            // Add to command history
            commandHistory.push(inputValue);
            historyIndex = commandHistory.length;

            // --- Display the input line ---
            const inputLine = document.createElement('div');
            inputLine.className = 'input-line';

            const promptElement = document.createElement('div');
            promptElement.className = 'prompt';
            promptElement.innerText = 'visitor@portfolio:~$';

            const commandElement = document.createElement('div');
            commandElement.className = 'command';
            commandElement.innerText = inputValue; // safe, user input

            inputLine.appendChild(promptElement);
            inputLine.appendChild(commandElement);
            outputElement.appendChild(inputLine);

            // --- Process the command ---
            const [cmd, ...args] = inputValue.split(' ');
            const response = document.createElement('div');
            response.className = 'response';

            if (cmd in commands) {
                // Use innerHTML for HTML output from your commands
                let commandOutput = commands[cmd](args) || '';
            
                // Replace line breaks with <br> so multi-line output looks like a terminal
                commandOutput = commandOutput.replace(/\n/g, '<br>');

                response.innerHTML = commandOutput;
            } else {
                // Error messages can also have HTML
                response.innerHTML = `Command not found: <strong>${cmd}</strong>. Type 'help' for available commands.`;
                response.classList.add('error');
            }

            outputElement.appendChild(response);
            outputElement.appendChild(currentPromptElement);
            document.getElementById('input').focus();
            // Clear input
            inputElement.value = '';

            // only scroll if at bottom
            const atBottom = outputElement.scrollTop + outputElement.clientHeight >= outputElement.scrollHeight - 10;
            if (atBottom) {
                outputElement.scrollTo({
                top: outputElement.scrollHeight,
                behavior: 'smooth'
            });
}
        }
        // Up arrow - previous command
        else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputElement.value = commandHistory[historyIndex];
            }
            e.preventDefault(); // Prevent cursor from moving to start
        }

        // Down arrow - next command
        else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputElement.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputElement.value = '';
            }
            e.preventDefault(); // Prevent cursor from moving to end
        }

        // Tab completion
        else if (e.key === 'Tab') {
            e.preventDefault();

            const currentInput = inputElement.value.trim();
            if (!currentInput) return;

            const [partialCmd] = currentInput.split(' ');
            const matches = autoCompleteCommands.filter(cmd =>
                cmd.startsWith(partialCmd));

            if (matches.length === 1) {
                inputElement.value = matches[0];
            }
        }
    });

    // Always focus the input
    document.addEventListener('click', () => {
        inputElement.focus();
    });

    // Initial focus
    inputElement.focus();

    // Simulate typing the intro
    const introText = "help";
    let i = 0;

    function typeIntro() {
        if (i < introText.length) {
            inputElement.value += introText.charAt(i);
            i++;
            setTimeout(typeIntro, 150);
        } else {
            setTimeout(() => {
                // Simulate pressing Enter
                const event = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true
                });
                inputElement.dispatchEvent(event);
            }, 100);
        }
    }

    setTimeout(typeIntro, 500);
});
