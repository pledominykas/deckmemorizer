<script lang="ts" module>
  import * as Card from "$lib/components/ui/card/index.js";
  import { CardSuit, VALUE_DISPLAY_NAMES, type Deck } from "$lib/types/cards";
  import { CardDisplay } from "../card-display";
  import { ScrollArea } from "../scroll-area";

  export type DeckGridViewProps = {
    deck: Deck;
  };
</script>

<script lang="ts">
  let { deck }: { deck: Deck } = $props();
</script>

<ScrollArea class="flex-1 min-h-0 p-6">
  <div
    class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4"
  >
    {#each deck.cards as card}
      <Card.Root>
        <Card.Header>
          <CardDisplay {card} />
        </Card.Header>
        <Card.Content>
          <Card.Title
            >{VALUE_DISPLAY_NAMES[card.value]} of {card.suit}</Card.Title
          >
          <Card.Description>
            Position {card.position}
          </Card.Description>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
</ScrollArea>
