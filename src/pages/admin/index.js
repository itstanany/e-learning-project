/**
 * Admin Dashboard placeholder
 */
import React from 'react';
import { protectPage } from '../../utils/server';

function Admin() {
  return (
    <div>
      Admin Dashboard Placeholder
    </div>
  );
}

export const getServerSideProps = protectPage(() => ({ props: {} }));

export default (Admin);
