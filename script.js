// Portfolio content
const portfolioData = {
    about: `
Hi, I'm Leo. 

I'm a curious and motivated student excited to apply my technical and personal skills to real world projects. 
With a deep interest in computer science, I approach challenges analytically and enjoy using my logical problem-solving skills to design practical and elegant solutions.

When I'm not coding, you can find me playing rugby, practicing Taekwondo or leading Cadets
(but usually doing maths homework) 

I'm having issues with my Linkedin currently, so you can read a back up of the posts on my github at https://github.com/yamoca/Linkedin-Posts-Backup

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
        I did the programming, art and gamedesign myself, and was voted 8th in originality out of 350 games`, 
        tech: "C#, Unity, Aseprite",
        link: "https://yakondu.itch.io/bloop"
    },
    {
        title: "Brainf*ck interpreter",
        description: `Designed and implemented a simple interpreter for the esoteric Brainf*ck programming language.
        Simulated memory, pointers and implemented control flow logic`, 
        tech: "Python",
        link: "#dataviz-dashboard"
    }
    ],

    experience: [{
        position: "Work Experience Participant",
        company: "MBDA",
        period: "February 2025",
    }
    ],
        
    contact: {
        email: "leojwgulliver@gmail.com",
        github: "github.com/yamoca",
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
            output += `Technologies: ${project.tech}\n`;
            output += `Link: ${project.link}\n\n`;
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

    education: () => {
        let output = "Education:\n\n";
        portfolioData.education.forEach(edu => {
            output += `${edu.degree}\n`;
            output += `${edu.institution}, ${edu.year}\n\n`;
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
Twitter : ${contact.twitter}
`;
    },

    clear: () => {
        document.getElementById('output').innerHTML = '';
        return '';
    },

    ls: () => {
        return "Available sections:\n\nabout.txt\nskills.txt\nprojects.txt\nexperience.txt\neducation.txt\ncontact.txt";
    },

    cat: (args) => {
        if (!args || args.length === 0) {
            return "Usage: cat [filename]";
        }

        const file = args[0].toLowerCase().replace('.txt', '');
        if (['about', 'skills', 'projects', 'experience', 'education', 'contact'].includes(file)) {
            return commands[file]();
        } else {
            return `File not found: ${args[0]}`;
        }
    },

    echo: (args) => {
        if (!args || args.length === 0) {
            return "";
        }
        return args.join(" ");
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
                return `Unknown theme: ${theme}. Available themes: matrix, ubuntu, midnight, light`;
        }
    }
};

// Initialize terminal functionality
document.addEventListener('DOMContentLoaded', () => {
    const outputElement = document.getElementById('output');
    const inputElement = document.getElementById('input');

    // Command history functionality
    let commandHistory = [];
    let historyIndex = -1;

    // Auto complete commands
    const autoCompleteCommands = Object.keys(commands);

    inputElement.addEventListener('keydown', (e) => {
        // if (e.key === 'Enter') {
        //     e.preventDefault();

        //     const inputValue = inputElement.value.trim();
        //     if (!inputValue) return;

        //     // Add to command history
        //     commandHistory.push(inputValue);
        //     historyIndex = commandHistory.length;

        //     // Display command
        //     const inputLine = document.createElement('div');
        //     inputLine.className = 'input-line';

        //     const promptElement = document.createElement('div');
        //     promptElement.className = 'prompt';
        //     promptElement.innerText = 'visitor@portfolio:~$';

        //     const commandElement = document.createElement('div');
        //     commandElement.className = 'command';
        //     commandElement.innerText = inputValue;

        //     inputLine.appendChild(promptElement);
        //     inputLine.appendChild(commandElement);
        //     outputElement.appendChild(inputLine);

        //     // Process the command
        //     const [cmd, ...args] = inputValue.split(' ');
        //     const response = document.createElement('div');
        //     response.className = 'response';

        //     if (cmd in commands) {
        //         response.innerHTML = commands[cmd](args) || '';
        //     } else {
        //         response.innerHTML = `Command not found: ${cmd}. Type 'help' for available commands.`;
        //         response.classList.add('error');
        //     }

        //     outputElement.appendChild(response);
        //     inputElement.value = '';

        //     // Scroll to bottom
        //     window.scrollTo(0, document.body.scrollHeight);
        //     inputElement.scrollIntoView({
        //         behavior: 'smooth'
        //     });
        // }

        if (e.key === 'Enter') {
            e.preventDefault();

            const inputValue = inputElement.value.trim();
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

            // Clear input
            inputElement.value = '';

            // Scroll to bottom
            window.scrollTo(0, document.body.scrollHeight);
            inputElement.scrollIntoView({ behavior: 'smooth' });
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
