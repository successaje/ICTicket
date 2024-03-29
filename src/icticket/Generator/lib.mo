import Nat32 "mo:base/Nat32";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Types "types";

module {
    public class Factory(state : Types.State) {

        var ledger : [var ?Types.Ticket]  = Array.init(Nat32.toNat(state.generate), null);

        public func _getTicketIndex() : ?Nat32 {
            var i : Nat32 = 0;
            for (values in ledger.vals()) {
                if (values == null) return ?i;
                i += 1;
            };
            null;
        };

        public func _getOwner(i : Nat) : ?Types.Ticket {
            ledger[i];
        };

        public func _generate(caller : Principal, to : Principal) : Result.Result<(Nat), Text> {
            switch(_getTicketIndex()) {
                case (?i) {
                    ledger[Nat32.toNat(i)] := ?{
                        generatedAt = Time.now();
                        owner   = caller;
                        statement = "N/A";
                    };

                    #ok(Nat32.toNat(i));
                };
                case _ #err("Cannot generate anything anymore");
            }
        };

        public func _multipleGenerator(caller : Principal, to : Principal, n : Nat) : [Nat] {
            var temporaryArray = [n];
            for (i in Iter.range(0, n)) {
                let generated : Nat = switch(_generate(caller, to)) {
                    case (#ok(ticketIndex)) { ticketIndex };
                    case (#err (_)) { 0 };
                };
                temporaryArray := Array.append(temporaryArray, [i]);

            };
            // let i = 0;
            // while (i < n) {
            //     // generated has to be nat
            //     let generated = switch(_generate(caller, to)) {
            //         case (#ok(ticketIndex)) { ticketIndex };
            //         case (#err (_)) { 0 };    
            //     };
            //     temporaryArray := Array.append(temporaryArray, [i]);
            //     i += 1;

            // };
            return temporaryArray;
        };

    }
};
