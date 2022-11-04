module {
    public type State = {
        generate : Nat32;
    };

    public type Ticket = {
        generatedAt : Int;
        owner   : Principal;
        statement   : Text;
    };
};