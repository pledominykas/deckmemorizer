<script lang="ts" module>
  import * as Card from "$lib/components/ui/card/index.js";
  import clsx from "clsx";
  import type { ComponentProps } from "svelte";

  export type PracticeProgressCardProps = {
    title: string;
    content: string;
    footer: string;
  } & ComponentProps<typeof Card.Root>;
</script>

<script lang="ts">
  let {
    title,
    content,
    footer,
    class: className,
    ...rest
  }: PracticeProgressCardProps = $props();
</script>

<Card.Root {...rest} class={clsx("gap-2 flex-1", className)}>
  <Card.Header>
    <Card.Title>{title}</Card.Title>
  </Card.Header>
  <Card.Content class="text-2xl font-bold">
    {content}
  </Card.Content>
  <Card.Footer>{footer}</Card.Footer>
</Card.Root>
