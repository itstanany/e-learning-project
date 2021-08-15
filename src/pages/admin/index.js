import React from 'react';
import { protectPage } from '../../utils/clientServer/protectPage';

function Admin() {
  return (
    <div>
      Admin Placeholder
    </div>
  );
}

export const getServerSideProps = protectPage(() => ({ props: {} }));

export default (Admin);
