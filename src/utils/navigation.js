export const goRegistration = (navigate, routeName) => {
  navigate(`/${routeName}/novo`);
};

export const goView = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}`);
};

export const goEdit = (navigate, routeName, id) => {
  navigate(`/${routeName}/${id}/editar`);
};

export const goOrigin = (navigate, routeName) => {
  navigate(`/${routeName}`);
};
