export const getTypes = () => {
  return [
    {
      label: 'Product',
      value: 1

    },
    {
      label: 'Order',
      value: 2
    }
  ];
};

export const getDiscountTypes = () => {
  return [
    {
      label: 'Percentage',
      value: 1
    },
    {
      label: 'Value',
      value: 2
    }
  ];
};

export const getVoucherVolumes = () => {
  return [
    {
      label: 'Single',
      value: 'single'
    },
    {
      label: 'Bulk',
      value: 'bulk'
    }
  ];
};