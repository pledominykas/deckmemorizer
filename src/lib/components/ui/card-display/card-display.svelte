<script lang="ts">
  import { CardSuit, type Card } from "$lib/types/cards";

  export let card: Card | null = null;
  export let position: number | null = null;
</script>

<div
  class="h-full aspect-2/3 border border-primary-muted rounded-lg text-xl font-bold flex items-center justify-center gap-2"
>
  {#if card?.suit === CardSuit.Clubs}
    <span class="text-(--deck-card-black)">{card.value}&clubs;</span>
  {:else if card?.suit === CardSuit.Hearts}
    <span class="text-(--deck-card-red)">{card.value}&hearts;</span>
  {:else if card?.suit === CardSuit.Diamonds}
    <span class="text-(--deck-card-red)">{card.value}&diams;</span>
  {:else if card?.suit === CardSuit.Spades}
    <span class="text-(--deck-card-black)">{card.value}&spades;</span>
  {:else if position !== null}
    <span class="text-(--deck-card-black)">#{position}?</span>
  {:else}
    <span class="text-(--deck-card-black)">?</span>
  {/if}
</div>
