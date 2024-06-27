<script lang="ts">
    const jsonTodos = localStorage.getItem("todos") || "";
    let parsed: any;

    if (jsonTodos !== "") {
        parsed = JSON.parse(jsonTodos);
    }
    else {
        parsed = [];
    }

    let newDiv: HTMLDivElement;
    let editDiv: HTMLDivElement;

    let id: number = 0;
    let title: string = "";
    let description: string = "";
    let important: boolean = false;
    let urgent: boolean = false;
    let category: number = 0;
    let author: string = "";
    let start: Date = new Date();
    let end: Date = new Date();
    let completed: boolean = false;


    let editId: number = 0;
    let editTitle: string = "";
    let editDescription: string = "";
    let editImportant: boolean = false;
    let editUrgent: boolean = false;
    let editCategory: number = 0;
    let editAuthor: string = "";
    let editStart: Date;
    let editEnd: Date;
    let editCompleted: boolean = false;

    try {
        id = parsed[parsed.length - 1]["id"] + 1;
    }
    catch {
        id = 0;
    }

    async function createTodo(event: SubmitEvent) {
        newDiv.hidden = true;
        event.preventDefault();

        const todo = {
            "id": id,
            "title": title,
            "description": description,
            "important": important,
            "urgent": urgent,
            "category": category,
            "author": author,
            "start": start,
            "end": end,
            "completed": completed
        }

        title = "";
        description = "";
        important = false;
        urgent = false;
        category = 0;
        author = "";
        start = new Date();
        end = new Date();
        completed = false;

        id += 1;

        parsed = [...parsed, todo]; // reassignment of the variable causes the html to rerender that component
        
        const result: string = JSON.stringify(parsed);

        localStorage.setItem("todos", result);
        // todoDiv.hidden = true;

        console.log(parsed);
    }

    function newTodo() {
        newDiv.hidden = false;
        editDiv.hidden = true;
    }
    
    async function edit(event: SubmitEvent) {
        newDiv.hidden = true;

        const formData = new FormData(event.target);
        editId = formData.get("id");

        for (let i = 0; i < parsed.length; i++) {
            if (parsed[i].id == editId) {
                editTitle = parsed[i].title;
                editDescription = parsed[i].description;
                editImportant = parsed[i].important;
                editUrgent = parsed[i].urgent;
                editCategory = parsed[i].category;
                editAuthor = parsed[i].author;
                editStart = parsed[i].start;
                editEnd = parsed[i].end;
                editCompleted = parsed[i].completed;
            }
        }

        editDiv.hidden = false;
    }

    async function submitChanges(event: any) {
        const formData = new FormData(event.target);
        console.log(formData);

        for (let i = 0; i < parsed.length; i++) {
            if (parsed[i].id == editId) {
                parsed[i].title = editTitle;
                parsed[i].description = editDescription;
                parsed[i].important = editImportant;
                parsed[i].urgent = editUrgent;
                parsed[i].category = editCategory;
                parsed[i].author = editAuthor;
                parsed[i].start = editStart;
                parsed[i].end = editEnd;
                parsed[i].completed = editCompleted;
            }
        }

        editDiv.hidden = true;

        const result: string = JSON.stringify(parsed);

        localStorage.setItem("todos", result);
    }

    async function deleteTodo(event: any) {
        newDiv.hidden = true;
        editDiv.hidden = true;
        event.preventDefault();

        const formData = new FormData(event.target);

        const deleteId = formData.get("id");
        
        for (let i = 0; i < parsed.length; i++) {
            if (parsed[i].id == deleteId) {
                parsed.splice(i, 1);
                parsed = [...parsed];
            }
        }

        const result: string = JSON.stringify(parsed);

        localStorage.setItem("todos", result);
    }
</script>

<svelte:head>
	<title>Todos</title>
	<meta name="description" content="Todo App for IT" />
</svelte:head>

<section>
	<h1>Todo list</h1>
    <div class="app">
        <div class="todos">
            {#each parsed as todo}
                <div class="todo">
                    <form on:submit|preventDefault={edit}>
                        <input type="hidden" name="id" value={todo.id} />
                        <input type="checkbox" checked={todo.completed} disabled />
                        <input type="text" value={todo.title} disabled />
                        <button type="submit">edit</button>
                    </form>
                    <form on:submit|preventDefault={deleteTodo}>
                        <input type="hidden" name="id" value={todo.id} />
                        <button type="submit">delete</button>
                    </form>
                </div>
            {/each}
            <button on:click={newTodo} class="new">new</button>
        </div>
        <div bind:this={newDiv} hidden>
            <button on:click={() => {newDiv.hidden = true}}>close</button>
            <form on:submit|preventDefault={createTodo} class="newTodo">
                <input type="hidden" bind:value={id} />
                <p>
                    <label for="title">title:</label>
                    <input type="text" name="title" bind:value={title} required />
                </p>
                <p>
                    <label for="description">description:</label>
                    <input type="text" name="description" bind:value={description} required />
                </p>
                <p>
                    <label for="important">important:</label>
                    <input type="checkbox" name="important" bind:checked={important} />
                </p>
                <p>
                    <label for="urgent">urgent:</label>
                    <input type="checkbox" name="urgent" bind:checked={urgent} />
                </p>
                <p>
                    <label for="category">category:</label>
                    <input type="number" name="category" bind:value={category} required />
                </p>
                <p>
                    <label for="author">author:</label>
                    <input type="text" name="author" bind:value={author} required />
                </p>
                <p>
                    <label for="start">start:</label>
                    <input type="date" name="start" bind:value={start} required />
                </p>
                <p>
                    <label for="end">end:</label>
                    <input type="date" name="end" bind:value={end} required />
                </p>
                <p>
                    <label for="completed">completed:</label>
                    <input type="checkbox" name="completed" bind:checked={completed}/>
                </p>
                <button type="submit">submit</button>
            </form>
        </div>

        <div bind:this={editDiv} hidden>
            <button on:click={() => {editDiv.hidden = true}}>close</button>
            <form on:submit|preventDefault={submitChanges}>
                <input type="hidden" bind:value={editId} />
                <p>
                    <label for="title">title:</label>
                    <input type="text" name="title" bind:value={editTitle} required />
                </p>
                <p>
                    <label for="description">description:</label>
                    <input type="text" name="description" bind:value={editDescription} required />
                </p>
                <p>
                    <label for="important">important:</label>
                    <input type="checkbox" name="important" bind:checked={editImportant} />
                </p>
                <p>
                    <label for="urgent">urgent:</label>
                    <input type="checkbox" name="urgent" bind:checked={editUrgent} />
                </p>
                <p>
                    <label for="category">category:</label>
                    <input type="number" name="category" bind:value={editCategory} required />
                </p>
                <p>
                    <label for="author">author:</label>
                    <input type="text" name="author" bind:value={editAuthor} required />
                </p>
                <p>
                    <label for="start">start:</label>
                    <input type="date" name="start" bind:value={editStart} required />
                </p>
                <p>
                    <label for="end">end:</label>
                    <input type="date" name="end" bind:value={editEnd} required />
                </p>
                <p>
                    <label for="completed">completed:</label>
                    <input type="checkbox" name="completed" bind:checked={editCompleted}/>
                </p>
                <button type="submit">confirm</button>
            </form>
        </div>
    </div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

    .newTodo {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.5vh;
    }

    p {
        gap: 0.5vh;
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size: 2vh;
        margin: 0;
        justify-content: space-between;
    }

    label {
        text-align: right;
    }

    input {
        display: block;
        align-self: center;
        height: 2vh;
        border: none;
        padding: 0.5vh;
    }

    .todo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 1vh;
        width: 100%;
    }

    .todo form {
        display: flex;
        gap: 1vh;
    }

    .todo form button {
        width: 7vw;
    }

    .todos {
        display: flex;
        flex-direction: column;
        gap: 1vh;
        width: 100%;
        align-items: center;
    }

    .app {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 5vh;
    }

    .new {
        width: 7vw;
    }
</style>
