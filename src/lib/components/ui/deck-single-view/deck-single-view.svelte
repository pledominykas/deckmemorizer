<script lang="ts" module>
  import { CardSuit, VALUE_DISPLAY_NAMES, type Deck } from "$lib/types/cards";
  import Button from "../button/button.svelte";
  import { ArrowRight, ArrowLeft } from "@lucide/svelte/icons";
  import { CardDisplay } from "../card-display";

  export type DeckSingleViewProps = {
    deck: Deck;
  };
</script>

<script lang="ts">
  let { deck }: { deck: Deck } = $props();

  let currentCardIndex = $state(0);
  const card = $derived(deck.cards[currentCardIndex]);
</script>

<div class="flex flex-col items-center gap-4 flex-1">
  <div class="grow p-6">
    <CardDisplay {card} />
  </div>
  <div class="flex gap-4 items-center">
    <Button
      variant="outline"
      disabled={currentCardIndex === 0}
      onclick={() => currentCardIndex--}
    >
      <ArrowLeft /> Previous
    </Button>
    <div>
      {currentCardIndex + 1} / {deck.cards.length}
    </div>
    <Button
      variant="outline"
      disabled={currentCardIndex >= deck.cards.length - 1}
      onclick={() => currentCardIndex++}
    >
      Next <ArrowRight />
    </Button>
  </div>
</div>
