<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { DeckSelectCard } from "$lib/components/ui/deck-select-card";
  import { DECKS } from "$lib/constants/decks";
  import { WandSparkles, Plus } from "@lucide/svelte/icons";
  import * as Dialog from "$lib/components/ui/dialog";
  import Label from "$lib/components/ui/label/label.svelte";
  import { getCustomDecks, addCustomDeck, removeCustomDeck } from "$lib/state/custom-decks.svelte";
  import { parseCardNotation } from "$lib/utils/parse-deck";

  let open = $state(false);
  let name = $state("");
  let notation = $state("");
  let error = $state<string | null>(null);

  function handleAdd() {
    error = null;
    if (!name.trim()) {
      error = "Please enter a deck name.";
      return;
    }
    const id = encodeURIComponent(name.trim());
    if (Object.prototype.hasOwnProperty.call(getCustomDecks(), id)) {
      error = "A deck with this name already exists.";
      return;
    }
    const cards = parseCardNotation(notation);
    if (!cards) {
      error =
        "Invalid notation. Enter all 52 cards (e.g. 4C 2H 7D...) separated by spaces, commas, or newlines. Use A, 2–10 (or T), J, Q, K and S, H, D, C for suits.";
      return;
    }
    addCustomDeck({
      id,
      title: name.trim(),
      longTitle: `${name.trim()} Trainer`,
      author: "Custom",
      shortDescription: "A custom deck.",
      longDescription: "A custom deck.",
      pageDescription: "A custom deck.",
      cards,
    });
    name = "";
    notation = "";
    open = false;
  }

  let customDeckList = $derived(Object.values(getCustomDecks()));
</script>

<svelte:head>
  <title>Memdeck Trainer - Practice Mnemonica, Aronson & Redford Stacks | Deck Memorizer</title>
  <meta
    name="description"
    content="Free memdeck trainer for magicians. Master Mnemonica, Aronson Stack, Redford Stack, Si Stebbins, and Memorandum with interactive quizzes, positional recall, and card browsing."
  />
  <meta property="og:title" content="Memdeck Trainer - Practice Mnemonica, Aronson & Redford Stacks" />
  <meta property="og:description" content="Free memdeck trainer for magicians. Master Mnemonica, Aronson Stack, Redford Stack, Si Stebbins, and Memorandum with interactive quizzes, positional recall, and card browsing." />
  <meta name="twitter:title" content="Memdeck Trainer - Practice Mnemonica, Aronson & Redford Stacks" />
  <meta name="twitter:description" content="Free memdeck trainer for magicians. Master Mnemonica, Aronson Stack, Redford Stack, Si Stebbins, and Memorandum with interactive quizzes, positional recall, and card browsing." />
  {@html `<script type="application/ld+json">${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Deck Memorizer",
    "alternateName": "Memdeck Trainer",
    "description": "Free online memdeck trainer for magicians. Practice and master Mnemonica, Aronson Stack, Redford Stack, Si Stebbins, and Memorandum card stacks.",
    "url": "https://deckmemorizer.com",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  })}</script>`}
</svelte:head>

<div class="flex flex-col items-center justify-center mb-16">
  <div class="flex flex-wrap justify-center gap-4 text-center">
    <WandSparkles class="w-16 h-16 text-accent-foreground mb-4" />
    <h1 class="text-5xl font-bold mb-4">Deck Memorizer</h1>
  </div>
  <h2 class="text-xl text-primary text-center">
    Free memdeck trainer for card magic. Practice positional recall, cuts, and
    more.
  </h2>
</div>

<div class="flex justify-between items-center">
  <span class="text-xl font-medium">Select a Deck</span>
  <Dialog.Root bind:open>
    <Dialog.Trigger>
      {#snippet child({ props })}
        <Button {...props}>
          <Plus /> Add Custom Deck
        </Button>
      {/snippet}
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Add Custom Deck</Dialog.Title>
        <Dialog.Description>
          Enter a name and paste your deck in card notation (e.g.
          <code class="bg-muted rounded px-1 text-xs">4C 2H 7D...</code>). All
          52 cards required.
        </Dialog.Description>
      </Dialog.Header>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <Label for="deck-name">Deck Name</Label>
          <input
            id="deck-name"
            bind:value={name}
            placeholder="My Custom Deck"
            class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1"
          />
        </div>

        <div class="flex flex-col gap-2">
          <Label for="deck-notation">Card Notation</Label>
          <textarea
            id="deck-notation"
            bind:value={notation}
            placeholder="4C 2H 7D 3C 4H 6D AS 5H 9S 2S..."
            rows={5}
            class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 resize-none font-mono"
          ></textarea>
        </div>

        {#if error}
          <p class="text-destructive text-sm">{error}</p>
        {/if}
      </div>

      <Dialog.Footer>
        <Dialog.Close>
          {#snippet child({ props })}
            <Button {...props} variant="outline">Cancel</Button>
          {/snippet}
        </Dialog.Close>
        <Button onclick={handleAdd}>Add Deck</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
  {#each Object.values(DECKS) as deck (deck.id)}
    <DeckSelectCard
      id={deck.id}
      title={deck.title}
      author={deck.author}
      description={deck.shortDescription}
    />
  {/each}
  {#each customDeckList as deck (deck.id)}
    <DeckSelectCard
      id={deck.id}
      title={deck.title}
      author={deck.author}
      description={deck.shortDescription}
      ondelete={() => removeCustomDeck(deck.id)}
    />
  {/each}
</div>
