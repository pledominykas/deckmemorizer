<script lang="ts" module>
  import * as Card from "$lib/components/ui/card/index.js";
  import { VALUE_DISPLAY_NAMES, type Deck } from "$lib/types/cards";
  import { CardDisplay } from "../card-display";
  import { ScrollArea } from "../scroll-area";

  export type DeckListViewProps = {
    deck: Deck;
  };
</script>

<script lang="ts">
  let { deck }: { deck: Deck } = $props();
</script>

<ScrollArea class="flex-1 min-h-0 p-6">
  <div class="flex flex-col gap-4">
    {#each deck.cards as card}
      <Card.Root class="h-24 py-3">
        <Card.Content class="flex flex-1 items-center gap-4">
          <div class="text-xl text-accent-foreground font-bold">
            {card.position}
          </div>
          <CardDisplay {card} />
          <div>
            {VALUE_DISPLAY_NAMES[card.value]} of {card.suit}
          </div>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
</ScrollArea>
