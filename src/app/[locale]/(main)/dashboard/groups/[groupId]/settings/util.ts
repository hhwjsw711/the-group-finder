import { Event, Group } from "@/db/schema";
import { env } from "@/env";

export const BASE_URL = env.HOST_NAME;

export function getGroupImageUrl(group: Pick<Group, "id" | "bannerId">) {
  return `${BASE_URL}/api/groups/${group.id}/images/${group.bannerId ?? "default"}`;
}

export function getEventImageUrl(event: Event) {
  return `${BASE_URL}/api/groups/${event.groupId}/images/${event.imageId ?? "default"}`;
}
