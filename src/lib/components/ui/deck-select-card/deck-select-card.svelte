<script lang="ts" module>
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Trash2 from "@lucide/svelte/icons/trash-2";

  export type DeckSelectCardProps = {
    id: string;
    title: string;
    author: string;
    description: string;
    ondelete?: () => void;
  };
</script>

<script lang="ts">
  let { id, title, author, description, ondelete }: DeckSelectCardProps = $props();

  let confirmOpen = $state(false);
</script>

<Card.Root>
  <Card.Header>
    <div class="flex items-start justify-between gap-2">
      <div>
        <Card.Title>{title}</Card.Title>
        <Card.Description>by {author}</Card.Description>
      </div>
      {#if ondelete}
        <Button
          variant="ghost"
          size="icon"
          class="text-destructive shrink-0"
          onclick={() => (confirmOpen = true)}
        >
          <Trash2 class="size-5" />
        </Button>
      {/if}
    </div>
  </Card.Header>
  <Card.Content class="flex-1">
    <p>{description}</p>
  </Card.Content>
  <Card.Footer>
    <Button onclick={() => goto(`/${id}`)}>Select Deck</Button>
  </Card.Footer>
</Card.Root>

{#if ondelete}
  <Dialog.Root bind:open={confirmOpen}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Delete "{title}"?</Dialog.Title>
        <Dialog.Description>This cannot be undone.</Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props} variant="outline">Cancel</Button>
          {/snippet}
        </Dialog.Close>
        <Button variant="destructive" onclick={() => { confirmOpen = false; ondelete(); }}>
          Delete
        </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{/if}
