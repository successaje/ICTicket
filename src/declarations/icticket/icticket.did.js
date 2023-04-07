export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Ticket = IDL.Record({
    'owner' : IDL.Principal,
    'statement' : IDL.Text,
    'generatedAt' : IDL.Int,
  });
  const TicketGenerator = IDL.Service({
    'generate' : IDL.Func([IDL.Principal], [Result], []),
    'getOwner' : IDL.Func([IDL.Nat], [IDL.Opt(Ticket)], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'multipleGenerate' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [IDL.Vec(IDL.Nat)],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
  return TicketGenerator;
};
export const init = ({ IDL }) => { return []; };
