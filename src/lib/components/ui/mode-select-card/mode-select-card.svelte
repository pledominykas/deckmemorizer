<script lang="ts" module>
  import type { Component } from "svelte";
  import type { IconProps } from "@lucide/svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "../button";

  export type ModeSelectCardProps = {
    title: string;
    icon: Component<IconProps>;
    description: string;
    features: string[];
    onClick: () => void;
    actionText: string;
  };
</script>

<script lang="ts">
  let {
    title,
    icon: Icon,
    description,
    features,
    onClick,
    actionText,
  }: ModeSelectCardProps = $props();
</script>

<Card.Root>
  <Card.Header class="flex items-center gap-4">
    <Icon />
    <Card.Title>{title}</Card.Title>
  </Card.Header>
  <Card.Content>
    <p>
      {description}
    </p>
    <ul class="list-disc list-inside">
      {#each features as feature}
        <li>{feature}</li>
      {/each}
    </ul>
  </Card.Content>
  <Card.Footer>
    <Button onclick={onClick}>{actionText}</Button>
  </Card.Footer>
</Card.Root>
