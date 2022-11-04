import Result "mo:base/Result";
import Generator "Generator";
import GeneratorTypes "Generator/types";

shared actor class TicketGenerator(){

  let _Ticket = Generator.Factory({
    generate = 1000;
  });

  public shared(msg) func generate(to : Principal) : async Result.Result<(Nat), Text> {
    await _Ticket._generate(msg.caller, to);
  };
  public shared(msg) func multipleGenerate(to : Principal, n : Nat) : async [Nat] {
    _Ticket._multipleGenerator(msg.caller, to, n);
  };

  public func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
