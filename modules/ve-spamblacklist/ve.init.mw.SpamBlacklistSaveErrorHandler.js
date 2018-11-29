mw.libs.ve.targetLoader.addPlugin( function () {

	ve.init.mw.SpamBlacklistSaveErrorHandler = function () {};

	OO.inheritClass( ve.init.mw.SpamBlacklistSaveErrorHandler, ve.init.mw.SaveErrorHandler );

	ve.init.mw.SpamBlacklistSaveErrorHandler.static.name = 'spamBlacklist';

	ve.init.mw.SpamBlacklistSaveErrorHandler.static.matchFunction = function ( editApi ) {
		return !!editApi.spamblacklist;
	};

	ve.init.mw.SpamBlacklistSaveErrorHandler.static.process = function ( editApi, target ) {
		// Handle spam blacklist error from Extension:SpamBlacklist
		target.showSaveError(
			$( $.parseHTML( editApi.sberrorparsed ) ),
			false // prevents reapply
		);
		// Emit event for tracking. TODO: This is a bad design
		target.emit( 'saveErrorSpamBlacklist' );
	};

	ve.init.mw.saveErrorHandlerFactory.register( ve.init.mw.SpamBlacklistSaveErrorHandler );

} );
