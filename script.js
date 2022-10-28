//A toi de jouer ! https://youtu.be/1dLcnxIock0
Vue.createApp({
    data() {
        return {
            newTodo: null,
            completedStyle: "text-decoration-line: line-through;",
            selected: "",
            priorities : {
                1: "Normal 🖊",
                2: "Important 🥊",
                3: "Urgent 🚨"
            },
            todos: [
                {text: 'Réviser Vue', isCompleted: false},
                {text: 'Finir la documentation d\'API', isCompleted: false},
                {text: 'Réviser Laravel', isCompleted: false},
                {text: 'Recrée la landing page avec Vue', isCompleted: false}
            ],
        };
    },
    // récupère le contenu du local storage au moment du chargement
    mounted() {
        if (localStorage.getItem('todos')) {
            try {
                console.log('App mounted');
                // Besoin de parse toute donnée complexe, donc tout objet
                this.todos = JSON.parse(localStorage.getItem('todos'));
                console.log(this.todos);
            } catch(e) {
                localStorage.removeItem('todos');
            }
        }
    },
    methods: {
        addTask(newTodo, selected) {
            if (newTodo && selected) {
                this.todos.push({text: newTodo, selected: selected, isCompleted: false});
                this.newTodo = '';
                this.saveTodos();
            }
        },
        isCompleted(todo) {
            todo.isCompleted = !todo.isCompleted;
            this.saveTodos();
        },
        clearTasks() {
            this.todos = [];
            this.saveTodos();
        },
        saveTodos() {
            // Besoin de passer en JSON tout objet
            const parsed = JSON.stringify(this.todos);
            localStorage.setItem('todos', parsed);
        },
        orderTodos() {
            this.todos.sort((a, b) => b.selected - a.selected);
        }

    }
}).mount('#app');