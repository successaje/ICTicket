export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const TicketGenerator = IDL.Service({
    'generate' : IDL.Func([IDL.Principal], [Result], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
  return TicketGenerator;
};
export const init = ({ IDL }) => { return []; };
