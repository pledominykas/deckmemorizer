<script lang="ts" module>
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import type { PageData } from "../$types";
</script>

<script lang="ts">
  import { DeckGridView } from "$lib/components/ui/deck-grid-view";
  import { DeckListView } from "$lib/components/ui/deck-list-view";
  import { DeckSingleView } from "$lib/components/ui/deck-single-view";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Browse {data.deck.title} - Complete Memdeck Card Order | Deck Memorizer</title>
  <meta
    name="description"
    content="Browse all 52 cards in the {data.deck.title} by {data.deck.author}. View the complete memdeck order in grid, list, or single card view."
  />
  <meta property="og:title" content="Browse {data.deck.title} - Complete Memdeck Card Order" />
  <meta property="og:description" content="Browse all 52 cards in the {data.deck.title} by {data.deck.author}. View the complete memdeck order in grid, list, or single card view." />
  <meta name="twitter:title" content="Browse {data.deck.title} - Complete Memdeck Card Order" />
  <meta name="twitter:description" content="Browse all 52 cards in the {data.deck.title} by {data.deck.author}. View the complete memdeck order in grid, list, or single card view." />
</svelte:head>

<Card.Root class="flex flex-col flex-1 min-h-0">
  <Card.Header>
    <Card.Title>Browse {data.deck.title}</Card.Title>
    <Card.Description>{data.deck.title} by {data.deck.author}</Card.Description>
  </Card.Header>
  <Card.Content class="flex flex-col flex-1 min-h-0">
    <Tabs.Root class="flex flex-col flex-1 min-h-0" value="grid">
      <Tabs.List>
        <Tabs.Trigger value="grid">Grid</Tabs.Trigger>
        <Tabs.Trigger value="list">List</Tabs.Trigger>
        <Tabs.Trigger value="single">Single</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="grid" class="flex flex-col flex-1 min-h-0">
        <DeckGridView deck={data.deck} />
      </Tabs.Content>
      <Tabs.Content value="list" class="flex flex-col flex-1 min-h-0">
        <DeckListView deck={data.deck} />
      </Tabs.Content>
      <Tabs.Content value="single" class="flex flex-col flex-1 min-h-0">
        <DeckSingleView deck={data.deck} />
      </Tabs.Content>
    </Tabs.Root>
  </Card.Content>
</Card.Root>
