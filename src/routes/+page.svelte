<script lang="ts">
    const jsonTodos = localStorage.getItem("todos") || "";
    let parsed: any;

    if (jsonTodos !== "") {
        parsed = JSON.parse(jsonTodos);
    }
    else {
        parsed = [];
    }

    let todoDiv: HTMLDivElement;

    let id: number = 0;
    let title: string = "";
    let description: string = "";
    let important: boolean = false;
    let urgent: boolean = false;
    let category: number = 0;
    let author: string = "";
    let start: Date;
    let end: Date;
    let completed: boolean = false;

    try {
        id = parsed[parsed.length - 1]["id"] + 1;
    }
    catch {
        id = 0;
    }

    async function createTodo(event: SubmitEvent) {
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

        id += 1;

        parsed = [...parsed, todo]; // reassignment of the variable causes the html to rerender that component
        
        const result: string = JSON.stringify(parsed);

        localStorage.setItem("todos", result);
        // todoDiv.hidden = true;

        console.log(parsed);
    }

    function newTodo() {
        todoDiv.hidden = false;
    }
    
    async function quickEdit(event: SubmitEvent) {
        event.preventDefault();
    }
</script>

<svelte:head>
	<title>Todos</title>
	<meta name="description" content="Todo App for IT" />
</svelte:head>

<section>
	<h1>Todo list</h1>
    <div class="todos">
        {#each parsed as todo}
        <form on:submit={quickEdit}>
            <input type="checkbox" bind:checked={todo.completed} disabled />
            {todo.title}
            <button type="submit">submit</button>
        </form>
        {/each}
    </div>
    <button on:click={newTodo}>new</button>
    <div bind:this={todoDiv} hidden>
        <button on:click={() => {todoDiv.hidden = true}}>close</button>
        <form on:submit={createTodo}>
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

    form {
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
</style>
