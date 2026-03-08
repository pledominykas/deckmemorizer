<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { DeckSelectCard } from "$lib/components/ui/deck-select-card";
  import { DECKS } from "$lib/constants/decks";
  import { WandSparkles, Plus } from "@lucide/svelte/icons";
</script>

<div class="flex flex-col items-center justify-center mb-16">
  <div class="flex flex-wrap justify-center gap-4 text-center">
    <WandSparkles class="w-16 h-16 text-accent-foreground mb-4" />
    <h1 class="text-5xl font-bold mb-4">Deck Memorizer</h1>
  </div>
  <h2 class="text-xl text-primary text-center">
    Master memdeck systems for card magic. Practice positional recall, cuts, and
    more.
  </h2>
</div>

<div class="flex justify-between items-center">
  <span class="text-xl font-medium">Select a Deck</span>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
  {#each Object.values(DECKS) as deck}
    <DeckSelectCard
      id={deck.id}
      title={deck.title}
      author={deck.author}
      description={deck.shortDescription}
    />
  {/each}
</div>
