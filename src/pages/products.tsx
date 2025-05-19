import { CONFIG } from 'src/config-global';

import { AgenciesView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Products - ${CONFIG.appName}`}</title>

      <AgenciesView />
    </>
  );
}
