<script lang="ts" module>
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";

  export type DeckSelectCardProps = {
    id: string;
    title: string;
    author: string;
    description: string;
  };
</script>

<script lang="ts">
  let { id, title, author, description }: DeckSelectCardProps = $props();
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
    <Card.Description>by {author}</Card.Description>
  </Card.Header>
  <Card.Content class="flex-1">
    <p>
      {description}
    </p>
  </Card.Content>
  <Card.Footer>
    <Button onclick={() => goto(`/${id}`)}>Select Deck</Button>
  </Card.Footer>
</Card.Root>
