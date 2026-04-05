import { goto } from '$app/navigation';
import { base } from '$app/paths';

export async function navigateBetweenPages(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  eventClickButtonByUser: Readonly<MouseEvent>,
): Promise<void> {
  const { target } = eventClickButtonByUser;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }
  const pageName = target.name;
  await goto(`${base}/${pageName}`);
}
