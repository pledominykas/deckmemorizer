<script lang="ts">
  import { Brain, BookOpen } from "@lucide/svelte/icons";
  import type { PageData } from "./$types";
  import { goto } from "$app/navigation";
  import DeckModeCard from "$lib/components/ui/mode-select-card/mode-select-card.svelte";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.deck.title} Trainer - Practice the {data.deck.title} Stack | Deck Memorizer</title>
  <meta
    name="description"
    content="{data.deck.title} trainer by {data.deck.author}. Practice positional recall, adjacent card identification, and cut calculations for the {data.deck.title} memdeck."
  />
  <meta property="og:title" content="{data.deck.title} Trainer - Practice the {data.deck.title} Stack" />
  <meta property="og:description" content="{data.deck.title} trainer by {data.deck.author}. Practice positional recall, adjacent card identification, and cut calculations." />
  <meta name="twitter:title" content="{data.deck.title} Trainer - Practice the {data.deck.title} Stack" />
  <meta name="twitter:description" content="{data.deck.title} trainer by {data.deck.author}. Practice positional recall, adjacent card identification, and cut calculations." />
</svelte:head>

<div class="flex flex-col gap-24">
  <div>
    <h1 class="text-5xl font-bold mb-4 text-center">{data.deck.title}</h1>
    <p class="text-xl text-accent-foreground mb-6 text-center">
      by {data.deck.author}
    </p>
    <p class="text-xl text-primary text-center">{data.deck.longDescription}</p>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <DeckModeCard
      title="Learn Mode"
      description="Test your knowledge with customizable quiz questions."
      features={[
        "Positional recall",
        "Adjacent card identification",
        "Cut calculations",
        "Custom question types",
      ]}
      icon={Brain}
      actionText="Start Learning"
      onClick={() => goto(`/${data.deck.id}/configure-practice-session`)}
    />
    <DeckModeCard
      title="Browse Mode"
      description="Study the complete deck order at your own pace."
      features={[
        "View all 52 cards in order",
        "See the position and card",
        "Perfect for memorization",
        "No time pressure",
      ]}
      icon={BookOpen}
      actionText="Browse Deck"
      onClick={() => goto(`/${data.deck.id}/browse`)}
    />
  </div>
</div>
