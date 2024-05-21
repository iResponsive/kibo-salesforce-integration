public with sharing class fetchRecordByIdLwc {
    @AuraEnabled(cacheable=true)
    public static List<Case> getCaseRec(Id recId) {
        List<Case> caseRecItem = [SELECT Id, CaseNumber, Subject, Status, Description, CreatedDate, AccountId, Account.Name, SuppliedEmail FROM Case WHERE Id = :recId];
        return caseRecItem;
    }
}
