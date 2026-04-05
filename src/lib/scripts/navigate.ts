import { goto } from '$app/navigation';
import { resolve } from '$app/paths';

export async function navigateBetweenPages(
  eventClickButtonByUser: Readonly<MouseEvent>,
): Promise<void> {
  const { target } = eventClickButtonByUser;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }
  const pageName = target.name;
  await goto(resolve(`/${pageName}`, {}), { replaceState: true });
}
