import Button from '../components/Button';

const FilterButtons = ({ currentPath, navigate }) => {
  const filters = [
    { label: 'All', path: '/all' },
    { label: 'Active', path: '/active' },
    { label: 'Completed', path: '/completed' },
  ];

  return (
    <div className="flex gap-2 mb-8">
      {filters.map(({ label, path }) => (
        <Button
          key={label}
          label={label}
          isActive={currentPath === path || (currentPath === '/' && label === 'All')}
          onClick={() => navigate(path)}
        />
      ))}
    </div>
  );
};

export default FilterButtons;