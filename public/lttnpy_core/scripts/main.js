/*
* //====================================================================(START) FRONTEND====================================================================//
*/
//______________________________ADD EMOTICON TO INPUT TEXTAREA
function emojiInitial() {
	new EmojiPicker();
	$('[data-emoji-picker="true"]').each(function() {
		$(this).attr("data-emoji-picker", "false");
	});
}

$(document).ready(function() {
	//_______________________________INITIAL EMOJI
	emojiInitial();

	//_______________________________INITIAL TOOLTIP EVENT
	$('[data-toggle="tooltip"]').tooltip();

	//_______________________________REMOVE Z-INDEX PARAM AFTER CLOSING MODAL IMAGE PREVIEW
	$('.t-chat-item-container .thc-detail-view-detail-popup').on('hidden.bs.modal', function () {
		$(this).closest(".t-chat-item-container").removeClass("t-img-preview-active");
	});

	//_______________________________AUTORESIZE TEXTAREA
	$('textarea').each(function(){
		// this.setAttribute('style','height:'+(this.scrollHeight)+'px;overflow:hidden;resize:none;');
		// this.setAttribute('style','min-height:35px; overflow:hidden; resize:none;');
		this.setAttribute('style','min-height:35px; overflow:hidden;');
	}).on('input',function(){
		this.style.height = 'auto';
		this.style.height = (this.scrollHeight)+'px';
	});   

	//__________________________DEMO INITIAL SELECT2 FOR SELECT TAG
	// $(document).ready(function() {
	// 	$(".tam-spamp-input select.form-control").select2();
	// });

	//_______________________________DEMO FOCUS/SELECT
	$(document).on('click', '.classNameXXX', function () {
		$(".thcp-popup").modal("show");

		// SetTimeout do có độ trễ (áp dụng cho cả div/input với thuộc tính focus())
		setTimeout(function(){
			$(".thcp-popup .modal-body .autofocus").focus();
			$(".thcp-popup .modal-body .autofocus").select();
		}, 500);
	});
});

//_________________________TOGGLE CHAT BOX LIST ON PC SCREEN
$(document).on('click', '.tc-btn-toggle, .t-chat-toggle, .tc-title-btn-close', function (e) {
	$(".t-chat-container").toggleClass("active active-mobile");
	$(".ta-main-content").toggleClass("active-right");
});

//_________________________TOGGLE CHAT BOX ITEM ON PC SCREEN
$(document).on('click', '.tci-toggle-btn', function (e) {
	$(this).closest(".t-chat-item").toggleClass("active");
});

//_________________________SHOW/HIDE CHAT BOX
$(document).on('click', '.tci-close-btn', function (e) {
	$(this).closest(".t-chat-item").addClass("hide");
});
$(document).on('click', '.tcl-item', function (e) {
	$(".t-chat-item").removeClass("hide");
});

//______________________event when key in header search textbox

$(document).on('keyup', '.th-search-input-textbox', function (e) {
	if ($(this).val().trim().length > 0) {
		$(".th-search-popup").addClass("active");
	} else {
		$(".th-search-popup").removeClass("active");
	}
});

//_________________________APP - TOGGLE LEFT MENU
$(document).on('click', '.tah-left-menu-toggle-btn, .t-mobile-menu-overlay', function (e) {
	$(".ta-left-menu, .ta-main-content, .t-mobile-menu-overlay, .thl-container").toggleClass("active");
});

//_________________________APP - USER PERMISSION
// $(document).on('click', '.t-checkbox', function (e) {
// 	const thisInput = $(this).find("input");
// 	if(thisInput.prop("checked")) {
// 		thisInput.prop("checked", false);
// 		$(this).parents('.tam-spamp-member-item').attr('id', 'choose-user-create-group-flase');
// 		console.log(thisInput.prop("checked"))
// 	} else {
// 		thisInput.prop("checked", true);
// 		$(this).parents('.tam-spamp-member-item').attr('id', 'choose-user-create-group-true');
// 		console.log(thisInput.prop("checked"));
// 	}
// });

//_________________________ADD NEW POST IMAGE EVENT

function readURL(input, thisInputObj) {
    if (input.files && input.files.length > 0) {
    	for (let i = 0; i < input.files.length; i++) {
    		let reader = new FileReader();
            reader.onload = function (e) {
                const newItem = $("#thcs-img-item-template").clone().removeAttr("id");
                newItem.find("img").attr('src', e.target.result);
                if (thisInputObj.closest(".thcp-comment-input-container").length > 0) {
	                thisInputObj.closest(".thc-input-container").find(".thcs-img-container").addClass("active").html(newItem);
                } else {
                	const thisImgItemAddBtn = thisInputObj.closest(".thc-input-container").find(".thcs-img-item-add");
	                thisInputObj.closest(".thc-input-container").find(".thcs-img-container").addClass("active").append(newItem);
	                thisInputObj.closest(".thc-input-container").find(".thcs-img-container").append(thisImgItemAddBtn);
                }
            };
            reader.readAsDataURL(input.files[i]);
    	}
    }
}

function readURL(input, thisInputObj) {
    if (input.files && input.files.length > 0) {
    	for (let i = 0; i < input.files.length; i++) {
    		let reader = new FileReader();
            reader.onload = function (e) {
                const newItem = $("#thcs-img-item-template").clone().removeAttr("id");
                newItem.find("img").attr({'src': e.target.result, '_imageID': i });
                if (thisInputObj.closest(".thcp-comment-input-container").length > 0) {
	                thisInputObj.closest(".thc-input-container").find(".thcs-img-container").addClass("active").html(newItem);
                } else {
                	const thisImgItemAddBtn = thisInputObj.closest(".thc-input-container").find(".thcs-img-item-add");
	                thisInputObj.closest(".thc-input-container").find(".thcs-img-container").addClass("active").append(newItem);
	                thisInputObj.closest(".thc-input-container").find(".thcs-img-container").append(thisImgItemAddBtn);
                }
            };
            reader.readAsDataURL(input.files[i]);
    	}
    }
}

$(document).on('change', '.thcs-input-image-content', function (e) {
	const thisInput = $(this);
	thisInput.closest(".thc-input-container").find(".thcs-file-name").addClass("hide").find(".thcs-file-name-text").html('');
	readURL(this, thisInput);
});

//_________________________EVENT WHEN CLICK ON POST IMAGES TO SHOW DETAIL IMAGE SLIDE

$(document).on('click', '.thcpi-first > a.thcs-img-item-link', function () {
	$(this).closest(".thcp-img-container").find(".thc-detail-view-detail-popup .carousel-inner .item").removeClass("active");
	$(this).closest(".thcp-img-container").find(".thc-detail-view-detail-popup .carousel-inner .item:first-child").addClass("active");
});

$(document).on('click', '.thcp-img > a.thcs-img-item-link', function () {
	const index = parseInt($(this).index()) + 2;
	$(this).closest(".thcp-img-container").find(".thc-detail-view-detail-popup .carousel-inner .item").removeClass("active");
	$(this).closest(".thcp-img-container").find(".thc-detail-view-detail-popup .carousel-inner .item:nth-child(" + index + ")").addClass("active");
});

$(document).on('click', '.thcs-img-item-link', function () {
	if ($(this).closest(".thcp-img-container").length > 0) {
		$(this).closest(".thcp-img-container").find(".thc-detail-view-detail-popup").modal("show");
	} else {
		$(this).closest(".thcp-author").find(".thc-detail-view-detail-popup").modal("show");
	}
	// ___________CHECK IF CHATBOX IMAGE PREVIEW CLICKED: CHANGE Z-INDEX PARAM
	if ($(this).closest(".t-chat-item-container").length > 0) {
		$(this).closest(".t-chat-item-container").addClass("t-img-preview-active");
	}
});

//_________________________________________________________________________________
//_________________________POST A NEW COMMENT EVENT

let newCommentIdIncrease = 1;

function postNewComment(selector) {
	const thisText = selector.closest(".thcp-comment-input-container").find(".thcs-input-textarea");
	const thisFileContainer = selector.closest(".thcp-comment-input-container").find(".thcs-file-name");
	const thisImageContainer = selector.closest(".thcp-comment-input-container").find(".thcs-img-container");

	const thisTextValue = thisText.attr("contenteditable")==="true" ? thisText.text() : thisText.val();

	//_________________CHECK IF EXIST INPUT DATA
	if(thisTextValue.trim().length > 0 || !thisFileContainer.hasClass("hide") || thisImageContainer.find(".thcs-img-item").length > 0) {
		let newItem;
		if (selector.closest(".thcp-comment-item-level2-container").length > 0) {
			newItem = $("#thcp-reply-template").clone().removeAttr("id");
		} else {
			newItem = $("#thcp-comment-item-template").clone().removeAttr("id");
		}
		//_______________________BIND TEXT INPUT
		newItem.find(".thcp-comment-content").html(`<p>${thisTextValue}</p>`);
		//_______________________BIND FILE INPUT
        if (!thisFileContainer.hasClass("hide") && thisFileContainer.length > 0) {
        	const thisFileName = thisFileContainer.find(".thcs-file-name-text").html();
        	const fileItem = '<a href="javascript:void(0)" class="thcs-file-name" title="' + thisFileName + '">' +
								'<img src="images/icon-folder.svg" alt="File" />' +
								'<span class="thcs-file-name-text">' + thisFileName + '</span>'
							'</a>';
        	newItem.find(".thcp-comment-content").after(fileItem);
        }
		//_______________________BIND IMAGE INPUT
        if (thisImageContainer.find(".thcs-img-item").length > 0) {
        	const thisImgUrl = thisImageContainer.find(".thcs-img-item img").attr("src");
        	const imgItem = '<a class="thcs-img-item-link" href="javascript:void(0)">' +
					'<img style="height: 150px; width: 150px; object-fit: cover; object-position: center; "  src="' + thisImgUrl + '" alt="News" />' +
				'</a>';
        	newItem.find(".thcpi-first").append(imgItem);
        	newItem.find(".thc-detail-view-detail-popup .thc-img-popup-item-content img").attr("src", thisImgUrl);
        }
		//_______________________BIND FILE & IMAGE - NEW INPUT ID
        const newUploadFileInputId = 'thcs-input-file-template' + newCommentIdIncrease;
        newItem.find(".thcs-input-file").attr("id", newUploadFileInputId);
        newItem.find("label.thcs-input-file-template").attr("for", newUploadFileInputId);
        const newUploadImgInputId = 'thcs-input-image-content-template' + newCommentIdIncrease;
        newItem.find(".thcs-input-image-content").attr("id", newUploadImgInputId);
        newItem.find("label.thcs-input-image-content-template").attr("for", newUploadImgInputId);
        newCommentIdIncrease++;
		//_______________________BIND EMOJI EVENT FOR THIS NEW INPUT
		newItem.find(".thcs-input-textarea").attr("data-emoji-picker", "true");
		selector.closest(".thcp-comment-input-container").before(newItem);
		emojiInitial();

        // _______________________CLEAR DATA ON CURRENT COMMENT BOX AFTER ADD A NEW COMMENT__________________________
        thisFileContainer.addClass("hide").attr("text", "").find(".thcs-file-name-text").html("");
        thisImageContainer.html("");
	}
	thisText.val("").text("");
	selector.attr("style", "");
}

$(document).on('click', '.thcp-comment-post-btn', function (e) {
	postNewComment($(this));
});

//_________________________REMOVE POST ITEM

let currentRemovePostItemSelector;
$(document).on('click', '.thcp-item-remove-post', function (e) {
	currentRemovePostItemSelector = $(this).closest(".thc-post");
	$("#thcp-remove").modal("show");
});

//_________________________REMOVE COMMENT ITEM

$(document).on('click', '.thcp-item-remove-comment', function (e) {
	currentRemovePostItemSelector = $(this).closest(".thcp-comment-item");
	$("#thcp-remove").modal("show");
});

//_________________________REMOVE REPLY ITEM

$(document).on('click', '.thcp-item-remove-reply', function (e) {
	currentRemovePostItemSelector = $(this).closest(".thcp-author");
	$("#thcp-remove").modal("show");
});

$(document).on('click', '.thcp-remove-btn', function (e) {
	currentRemovePostItemSelector.remove();
	$("#thcp-remove").modal("hide");
});

//_________________________EDIT POST ITEM

$(document).on('click', '.thcp-item-edit', function (e) {
	let selector = $(this);
	let thisText;
	let thisFileContainer;
	let thisImageContainer;
	if (selector.hasClass("thcp-item-edit-post")) {
		thisText = selector.closest(".thc-post").find(".thcp-content-container .thcp-text").text();
		thisFileContainer = selector.closest(".thc-post").find(".thcp-content-container .thcs-file-name");
		thisImageContainer = selector.closest(".thc-post").find(".thcp-content-container .thcp-img-container");
	}
	if (selector.hasClass("thcp-item-edit-comment") || selector.hasClass("thcp-item-edit-reply")) {
		thisText = selector.closest(".thcp-author").find(".thcp-comment-content").text();
		thisFileContainer = selector.closest(".thcp-author").find(".thcs-file-name");
		thisImageContainer = selector.closest(".thcp-author").find(".thcpi-first");
	}
	let editSelector;
	//_____________________check if edit post: open popup, else: bind edit comment html below the following comment
	if (selector.hasClass("thcp-item-edit-post")) {
		const popupSelector = $("#thcp-edit");
		//_______________________BIND TEXT INPUT
		popupSelector.find(".thcs-input-textarea").val(thisText.trim());
		popupSelector.modal("show");
	} else if (selector.hasClass("thcp-item-edit-comment") || selector.hasClass("thcp-item-edit-reply")) {
		editSelector = $("#thcp-edit-comment").clone().removeAttr("id");
		console.log(editSelector)
		//_______________________BIND FILE & IMAGE - NEW INPUT ID
		const newUploadFileInputId = 'thcs-input-file-content-edit-status' + newCommentIdIncrease;
		editSelector.find(".thcs-input-file").attr("id", newUploadFileInputId);
		editSelector.find("label.thcs-input-file-template").attr("for", newUploadFileInputId);
		const newUploadImgInputId = 'thcs-input-image-content-edit-status' + newCommentIdIncrease;
		editSelector.find(".thcs-input-image-content").attr("id", newUploadImgInputId);
		editSelector.find("label.thcs-input-image-content-template, label.thcs-img-item-add").attr("for", newUploadImgInputId);
		newCommentIdIncrease++;
		if (selector.hasClass("thcp-item-edit-post")) {
			selector.closest(".thc-post").find(".thcp-content-container").after(editSelector);
		} else if (selector.hasClass("thcp-item-edit-comment") || selector.hasClass("thcp-item-edit-reply")) {
			selector.closest(".thcp-author").after(editSelector);
		}
		//_______________________BIND EMOJI EVENT FOR THIS NEW INPUT
		editSelector.find(".thcs-input-textarea").attr("data-emoji-picker", "true");
		emojiInitial();
	}
});

$(document).on('click', '.thcs-btn-cancel', function (e) {
	$(this).closest(".thc-input-container").remove();
});

//_________________________NEW LINE FOR TEXT INPUT STATUS WHEN PRESS "ENTER"

$(document).on('keyup', '.thcs-input-textarea', function (e) {
	if ((e.ctrlKey || e.shiftKey) && e.keyCode === 13) {
		$(this).outerHeight($(this).outerHeight() + 19);
	} else if (e.keyCode === 13 && $(this).closest(".thcp-comment-input-container").length > 0) {
		postNewComment($(this));
	} else if (e.keyCode === 13 && $(this).closest(".thc-status").length > 0) {
		$(this).outerHeight($(this).outerHeight() + 19);
	}
	if (e.shiftKey && e.keyCode === 50) {
		$(this).closest(".thc-input-container").find(".thcs-tag-container-dropdown > a").trigger("click");
	}
});

//_________________________DELETE IMAGE ITEM EVENT
$(document).on('click', '.thcs-img-item-delete', function () {
	let componentInputChatting = $(this).parents('.tci-input-area').find('.thcp-comment-input-media');
	componentInputChatting.find('#tci-input-image-content-1').val('');
	$(this).parents(".thcs-img-item").remove();

});

//_________________________UPLOAD COMMENT FILE ITEM EVENT
$(document).on('change', '.thcs-input-file', function (e) {
    let thisName;
    let thisInput = $(this);
    if (e.currentTarget.files[0] !== undefined) {
        thisName = e.currentTarget.files[0].name;
		thisInput.closest(".thc-input-container").find(".thcs-file-name").removeClass("hide").attr("title", thisName).find(".thcs-file-name-text").html(thisName);
    } else {
        thisName = "";
		thisInput.closest(".thc-input-container").find(".thcs-file-name").addClass("hide").attr("title", thisName).find(".thcs-file-name-text").html(thisName);
    }
	thisInput.closest(".thc-input-container").find(".thcs-img-container").removeClass("active").find(".thcs-img-item").not(".thcs-img-item-add").remove();
});

//_________________________TOGGLE LIKE BUTTON
$(document).on('click', '.thcp-like-btn', function (e) {
	$(this).toggleClass("liked");
});

//_______________________________click on show Comment link

$(document).on('click', '.thcp-comment-item-interactive-show-comment', function (e) {
	$(this).parents(".thcp-comment-item-level1").next().toggleClass("active");
});

//_______________________________FOCUS TO COMMENT TEXTBOX

$(document).on('click', '.thcp-comment-toggle-post', function (e) {
	$(this).closest(".thcp-content").find(".thcp-comment .thcp-comment-input .form-control").focus();
});

//_________________________TRIGGER LEFT/RIGHT ARROW KEYBOARD TO NEXT/BACK POST IMAGES SLIDE
$(document).on('keyup', '.thc-detail-view-detail-popup.in', function (e) {
	if(e.keyCode === 37) {
		$(this).find(".left.carousel-control").trigger("click");
	}
	if(e.keyCode === 39) {
		$(this).find(".right.carousel-control").trigger("click");
	}
});

//_________________________REMOVE UPLOADED FILE ON EACH POST
$(document).on('click', '.thcs-file-name-remove', function (e) {
	let componentInputChatting = $(this).parents('.tci-input-area').find('.thcp-comment-input-media');
	componentInputChatting.find('#tci-input-file-1').val('');
	$(this).closest(".thcs-file-name").addClass("hide").find(".thcs-file-name-text").html('');
});
//_________________________SHOW MORE EVENT
$(document).on('click', '.thcp-text-showmore-btn', function (e) {
	const thisParent = $(this).closest(".thcp-text");
	if (thisParent.find(".thcp-text-dots").hasClass("hide")) {
		$(this).text("xem thêm");
	} else {
		$(this).text("Ẩn bớt");
	}
	thisParent.find(".thcp-text-dots, .thcp-text-show-more").toggleClass("hide");
});

//__________________________TRIGGER INPUT EVENT FOR CONTENTEDITABLE TAGS
$('body').on('focus', '[contenteditable]', function() {
	const $this = $(this);
	$this.data('before', $this.html());
}).on('blur keyup paste input', '[contenteditable]', function() {
	const $this = $(this);
	if ($this.data('before') !== $this.html()) {
		$this.data('before', $this.html());
		$this.trigger('change');
	}
});

//_________________________TAG USER NAME CHOOSING EVENT
$(document).on('click', '.thcs-tag-dropdown-item', function () {
	const thisName = '<a href="javascript:void(0)" class="ta-tag-user">' + $(this).text() + '<span class="ta-tag-user-remove"><img src="images/icon-close.svg" alt="Remove" /></span></a>&nbsp;&nbsp;';
	let thisTextInput;
	if ($(this).closest(".tci-input-area").length > 0) {
		thisTextInput = $(this).closest(".thcp-comment-input").find(".tci-input-textarea");
	} else {
		thisTextInput = $(this).closest(".thc-input-container").find(".thcs-input-textarea");
	}
	thisTextInput.append(thisName);
	if ($(this).closest(".tci-input-area").length > 0) {
		thisTextInput.trigger("input");
	}
	setCaret(thisTextInput[0], thisTextInput.text().length - 1);
});

//_________________________AVATAR HOVER EVENT: SHOW USER INFORMATION
$(document).on('mouseover', '.thcp-author-hover', function (e) {
	if ($(this).find(".thcp-author-hover-content").length === 0) {
		const thisUserInfor = $("#thcp-author-hover-content-template").clone().removeAttr("id");
		$(this).append(thisUserInfor);
	}
});

//_________________________SHOW DETAIL LIKE LIST POPUP
$(document).on('click', '.thcp-like-detail-btn', function (e) {
	$("#thcp-like-detail-list").modal("show");
});

//_________________________REMOVE TAG USER
$(document).on('click', '.ta-tag-user-remove', function (e) {
	$(this).closest(".ta-tag-user").remove();
});

//________________________________________________________________________________________________________________
//__________________________________________EVENTS FOR CHAT BOX___________________________________________________
//________________________________________________________________________________________________________________

$(document).on('input', '.tci-input-textarea', function (e) {
	this.style.height = 'auto';
	this.style.height = (this.scrollHeight)+'px';
});

//_________________________UPLOAD CHATBOX FILE ITEM EVENT
$(document).on('change', '.tci-input-file', function (e) {
	let thisName;
	let thisInput = $(this);
	if (e.currentTarget.files[0] !== undefined) {
		thisName = e.currentTarget.files[0].name;
		thisInput.closest(".tci-input-area").find(".thcs-file-name").removeClass("hide").attr("title", thisName).find(".thcs-file-name-text").html(thisName);
	} else {
		thisName = "";
		thisInput.closest(".tci-input-area").find(".thcs-file-name").addClass("hide").attr("title", thisName).find(".thcs-file-name-text").html(thisName);
	}
	thisInput.closest(".tci-input-area").find(".thcs-img-container").removeClass("active").find(".thcs-img-item").not(".thcs-img-item-add").remove();
});

$(document).on('change', '.tci-input-image-content', function (e) {
	const thisInput = $(this);
	thisInput.closest(".tci-input-area").find(".thcs-file-name").addClass("hide").find(".thcs-file-name-text").html('');
	readUrlChatBox(this, thisInput);
});

function readUrlChatBox(input, thisInputObj) {
	if (input.files && input.files.length > 0) {
		for (let i = 0; i < input.files.length; i++) {
			let reader = new FileReader();
			reader.onload = function (e) {
				const newItem = $("#tci-img-item-template").clone().removeAttr("id");
				newItem.find("img").attr({'src': e.target.result, '_imageID': i });
				const thisImgItemAddBtn = thisInputObj.closest(".tci-input-area").find(".thcs-img-item-add");
				thisInputObj.closest(".tci-input-area").find(".thcs-img-container").addClass("active").append(newItem);
				thisInputObj.closest(".tci-input-area").find(".thcs-img-container").append(thisImgItemAddBtn);
			};
			reader.readAsDataURL(input.files[i]);
		}
	}
}

//___________________________REACTION BUTTON EVENT

// $(document).on('click', '.tci-option-btn-reaction', function (e) {
// 	const newReactionItem = $("#tci-content-item-reaction-template").clone().removeAttr("id");
// 	$(this).closest(".tci-content-item-content").append(newReactionItem);
// });

//_________________________REMOVE CHAT ITEM

let currentRemoveChatItemItemSelector;
$(document).on('click', '.tci-option-btn-remove', function (e) {
	currentRemoveChatItemItemSelector = $(this).closest(".tci-content-item");
	$("#thcp-remove-chat-item").modal("show");
});

$(document).on('click', '.thcp-remove-chat-item-btn', function (e) {
	// currentRemoveChatItemItemSelector.remove();
	$("#thcp-remove-chat-item").modal("hide");
});

//___________________________EVENT FOR ADD A NEW CHAT ITEM


let newChatItemIdIncrease = 1;
function addNewChatItem(selector) {
	const thisText = selector.closest(".tci-input-area").find(".tci-input-textarea");
	const thisFileContainer = selector.closest(".tci-input-area").find(".thcs-file-name");
	const thisImageContainer = selector.closest(".tci-input-area").find(".thcs-img-container");

	const thisTextValue = thisText.attr("contenteditable")==="true" ? thisText.text() : thisText.val();

	//_________________CHECK IF EXIST INPUT DATA
	if(thisTextValue.trim().length > 0 || !thisFileContainer.hasClass("hide") || thisImageContainer.find("div.thcs-img-item").length > 0) {
		const newItem = $("#tci-content-item-template").clone().removeAttr("id");
		//_______________________BIND TEXT INPUT
		if (thisTextValue.trim().length > 0) {
			newItem.find(".tci-content-text").html(thisTextValue);
		}
		//_______________________BIND FILE INPUT
		if (!thisFileContainer.hasClass("hide")) {
			const thisFileName = thisFileContainer.find(".thcs-file-name-text").html();
			const fileItem = '<a href="javascript:void(0)" class="thcs-file-name margin-bottom-5 text-bold" title="' + thisFileName + '">' +
				'<img src="images/icon-folder.svg" alt="File" />' +
				'<span class="thcs-file-name-text">' + thisFileName + '</span>' +
			'</a>';
			newItem.find(".tci-content-item-content").prepend(fileItem);
		}
	
		//_______________________BIND IMAGE INPUT
		if (thisImageContainer.find("div.thcs-img-item").length > 0) {
			thisImageContainer.find("div.thcs-img-item").each(function(index) {
				const thisImgUrl = $(this).find("img").attr("src");
				const imgItem = '<a class="thcs-img-item-link" href="javascript:void(0)">' +
					'<img src="' + thisImgUrl + '" alt="News" />' +
					'</a>';
				let thisPreviewItem;
				if (index === 0) {
					newItem.find(".thcpi-first").append(imgItem);
					thisPreviewItem = '<div class="item active">' +
						'<div class="thc-img-popup-item-content">' +
						'<img src="' + thisImgUrl + '" alt="News" />' +
						'</div>' +
						'</div>';
				} else {
					newItem.find(".thcp-img").append(imgItem);
					thisPreviewItem = '<div class="item active">' +
						'<div class="thc-img-popup-item-content">' +
						'<img src="' + thisImgUrl + '" alt="News" />' +
						'</div>' +
						'</div>';
				}
				newItem.find(".thc-detail-view-detail-popup .carousel-inner").append(thisPreviewItem);
			});
		} else {
			newItem.find(".thcp-img-container").remove();
		}
		//_______________________BIND REPLY MESSAGE
		const thisReplyContent = selector.closest(".tci-input-area").find(".tci-reply-container");
		if (!thisReplyContent.hasClass("hide")) {
			const thisReplyText = '<div class="tci-content-text-reply">' + thisReplyContent.find(".tci-reply-text").text() + '</div>';
			newItem.find(".tci-content-text").before(thisReplyText);
			const thisReplyUser = '<div class="tci-content-user-reply"><i class="fas fa-reply"></i> Bạn đã trả lời <b>' + 'Hiep' + '</b></div>';
			newItem.find(".tci-content-item-content").before(thisReplyUser);
			thisReplyContent.addClass("hide");
		}

		//_______________________BIND NEW SLIDE ID
		const newCarouselSlideId = 'thc-detail-product-view-detail-slide-add-new-' + newChatItemIdIncrease;
		newItem.find(".carousel").attr("id", newCarouselSlideId);
		newItem.find(".carousel-control").attr("href", "#" + newCarouselSlideId);
		newChatItemIdIncrease++;
		const chatItemContent = selector.closest(".t-chat-item").find(".tci-content");
		chatItemContent.find(".tci-seen").remove();
		chatItemContent.append(newItem).animate({ scrollTop: chatItemContent[0].scrollHeight }, 0);

		// _______________________CLEAR DATA ON CURRENT INPUT BOX AFTER ADD A NEW CHAT MESSAGE__________________________
		thisFileContainer.addClass("hide").attr("text", "").find(".thcs-file-name-text").html("");
		thisImageContainer.find("div.thcs-img-item").remove();
	}
	thisText.val("").text("");
	selector.attr("style", "");
}

$(document).on('click', '.tci-input-enter-btn', function (e) {
	// addNewChatItem($(this));
});

$(document).on('keyup', '.tci-input-textarea', function (e) {
	if (e.shiftKey && e.keyCode === 50) {
		$(this).closest(".thcp-comment-input").find(".thcs-tag-container-dropdown > a").trigger("click");
	}
	if (e.keyCode === 13) {
		$(`#sendMessage`).trigger("click");
	//	addNewChatItem($(this));
	}
});

//__________________________EVENT FOR REPLY MODE - CHAT BOX ITEM

$(document).on('click', '.tci-reply-remove', function (e) {
	$(this).closest(".tci-reply-container").addClass("hide");
});

$(document).on('click', '.tci-option-btn-reply', function (e) {
	const thisText = $(this).closest(".tci-content-item-content").find(".tci-content-text").text();
	$(this).closest(".t-chat-item").find(".tci-reply-container").removeClass("hide").find(".tci-reply-text").text(thisText);
});

//__________________________RENAME CHATBOX CONVERSATION NAME - CHAT BOX ITEM EVENTS

$(document).on('click', '.tci-title-rename-btn', function (e) {
	const thisName = $(this).closest(".tci-title-rename").find(".tci-title-rename-input").val().trim();
	if (thisName.length > 0) {
		$(this).closest(".tci-title").find(".tci-title-name").text(thisName).attr("title", thisName);
		$(this).closest(".tci-title").find(".tci-title-rename").removeClass("active");
	}
});

$(document).on('click', '.tci-title-option-rename', function (e) {
	$(this).closest(".tci-title").find(".tci-title-rename").addClass("active");
});

//__________________________OPEN CHATBOX ADD NEW MEMBERS

$(document).on('click', '.tci-title-option-add-member, .tci-add-member-btn', function (e) {
	$("#tci-add-member-popup").modal("show");
});

//__________________________OPEN CHATBOX VIEW MEMBERS LIST

$(document).on('click', '.tci-title-option-view-member-list', function (e) {
	$("#tci-member-list").modal("show");
});

//__________________________OPEN CHATBOX DELETE CONVERSATION

$(document).on('click', '.tci-title-option-delete-conversation', function (e) {
	$("#tci-popup-delete-conversation-confirm").modal("show");
});

//__________________________OPEN CHATBOX ADD NEW CHAT GROUP

$(document).on('click', '.t-chat-user-add-new-group-btn', function (e) {
	$("#tci-add-group-popup").modal("show");
});

//__________________________OPEN CHATBOX ADD NEW CHAT GROUP

$(document).on('click', '.tci-toggle-search-btn, .tci-search-bar-toggle-btn', function (e) {
	$(".tci-search-bar").toggleClass("active");
});

//_________________________CHANGE CHAT USER THUMBNAIL IMAGE EVENT

function readURLChatUserThumbnail(input, inputSelector) {
	if (input.files && input.files.length > 0) {
		for (let i = 0; i < input.files.length; i++) {
			let reader = new FileReader();
			reader.onload = function (e) {
				inputSelector.closest(".tcih-thumbnail").find("img.tcih-thumbnail-img").attr('src', e.target.result);
			};
			reader.readAsDataURL(input.files[i]);
		}
	}
}

$(document).on('change', '.tcih-thumbnail-img', function (e) {
	//readURLChatUserThumbnail(this, $(this));
});

//_________________________TOGGLE INFORMATION SIDEBAR COLUMN
$(document).on('click', '.tci-btn-info', function (e) {
	$(".t-chat-info, .t-chat-item-container-clone.t-chat-item-container").toggleClass("active-toggle-info-sidebar");
});

//_________________________TOGGLE IMAGE SLIDE - INFORMATION SIDEBAR

$(document).on('click', '.tc-info-img-item', function () {
	const thisImagePopupSelector = $(".tc-info-img-slide-popup");
	thisImagePopupSelector.modal("show");
	const index = parseInt($(this).index()) + 1;
	thisImagePopupSelector.find(".carousel-inner .item").removeClass("active");
	thisImagePopupSelector.find(".carousel-inner .item:nth-child(" + index + ")").addClass("active");
});

//_________________________INFORMATION SIDEBAR - EDIT CONVERSATION NAME
$(document).on('click', '.tcih-name-edit-btn', function () {
	$(this).closest(".tcih-name").addClass("active").find("input.tcih-name-edit-input").select();
});

$(document).on('click', '.tcih-name-edit-btn-save', function () {
	const thisName = $(this).closest(".tcih-name-edit").find("input.tcih-name-edit-input").val();
	if (thisName.length > 0) {
		$(this).closest(".tcih-name").removeClass("active");
		$(this).closest(".tcih-name").find(".tcih-name-view").text(thisName);
	}
});

/*
* //====================================================================(END) FRONTEND====================================================================//
*/

/*
* //====================================================================(START) BACKEND====================================================================//
*/

/*====================================================================PHÂN QUYỀN THÀNH VIÊN====================================================================*/

// Danh sách lựa chọn
let listSelected = [];

// Thông tin user trong danh sách tìm kiếm (chưa được chọn)
function getInfoFoundUser({fullname, companySign, companyName, image, userID}){
	let element;
	if(companySign && companyName){
		element = `<div class="tam-spamp-member-item foundUser" _userID="${userID}" title="${companyName}">
			<img src="${image}"/>
			<span><span class="fullname">${fullname}</span> (<span class="companySign">${companySign}</span>)</span>
			<label class="t-checkbox">
				<input type="checkbox"/>
				<span></span>
			</label>
		</div>`;
	}else{
		// Sử dụng cho trường hợp không muốn thể hiện thông tin công ty
		element = `<div class="tam-spamp-member-item foundUser" _userID="${userID}">
			<img src="${image}"/>
			<span class="fullname">${fullname}</span>
			<label class="t-checkbox">
				<input type="checkbox"/>
				<span></span>
			</label>
		</div>`;
	}
	return element;
}

// Thông tin user đã được tích chọn hiển thị trong danh sách tìm kiếm
function getInfoTickedUser({fullname, companySign, companyName, image, userID}){
	let element;
	if(companySign && companyName){
		element = `<div class="tam-spamp-member-item tickedUser" _userID="${userID}" title="${companyName}">
			<img src="${image}"/>
			<span><span class="fullname">${fullname}</span> (<span class="companySign">${companySign}</span>)</span>
			<label class="t-checkbox">
				<input type="checkbox" checked/>
				<span></span>
			</label>
		</div>`;
	}else{
		// Sử dụng cho trường hợp không muốn thể hiện thông tin công ty
		element = `<div class="tam-spamp-member-item tickedUser" _userID="${userID}">
			<img src="${image}"/>
			<span class="fullname">${fullname}</span>
			<label class="t-checkbox">
				<input type="checkbox" checked/>
				<span></span>
			</label>
		</div>`;
	}
	return element;
}

// Thông tin user đã được lựa chọn nằm trong textbox
function getInfoSelectedUser({fullname, companySign, companyName, image, userID}){
	let element;
	if(companySign && companyName){
		element = `<div class="tam-spamp-member-item selectedUser" _userID="${userID}" title="${companyName}">
			<img src="${image}"/>
			<span><span class="fullname">${fullname}</span> (<span class="companySign">${companySign}</span>)</span>
			<label class="t-checkbox">
				<input type="checkbox" checked/>
				<span></span>
			</label>
		</div>`;
	}else{
		// Sử dụng cho trường hợp không muốn thể hiện thông tin công ty
		element = `<div class="tam-spamp-member-item selectedUser" _userID="${userID}">
			<img src="${image}"/>
			<span class="fullname">${fullname}</span>
			<label class="t-checkbox">
				<input type="checkbox" checked/>
				<span></span>
			</label>
		</div>`;
	}
	return element;
}

// Demo thành viên công ty (user trong company.js)
let listUserInCompanyDemo = [
	{fullname: 'TGO-Nguyễn Hữu Hiệp', companySign: 'TGO', companyName: 'Điều phối chung', image: 'images/img-thumbnail1.png', userID: '0e097828a6c5ae65f94b78f1'},
	{fullname: 'TGO-Lê Lưu Phong', companySign: 'TGO', companyName: 'Cố vấn quản trị', image: 'images/img-thumbnail2.png', userID: '0e097828a6c5ae65f94b78f2'},
	{fullname: 'TGO-Võ Viết Hồng', companySign: 'TGO', companyName: 'Cốn vấn thị trường', image: 'images/img-thumbnail3.png', userID: '0e097828a6c5ae65f94b78f3'},
	{fullname: 'TGO-Lê Duy Phương', companySign: 'TGO', companyName: 'Giám đốc công nghệ', image: 'images/img-thumbnail4.png', userID: '0e097828a6c5ae65f94b78f4'},
];

// Demo danh sách bạn bè: gồm cả trong và ngoài công ty (friends[] trong user-coll.js)
let listFriendsDemo = [
	{fullname: 'F-Lê Duy Phương', image: 'images/img-app-1.jpg', companySign: 'TGO', companyName: 'Công ty cổ phần FSTeam', userID: '1e097828a6c5ae65f94b78f1'},
	{fullname: 'F-Phan Văn Đệ', image: 'images/img-app-2.jpg', companySign: 'DEPV', companyName: 'Công ty TNHH Phan Văn Đệ', userID: '15e097828a6c5ae65f94b78f2'},
	{fullname: 'F-Nguyễn Huỳnh Vinh', image: 'images/img-thumbnail2.png', companySign: 'HUVI', companyName: 'Công ty cổ phần Huỳnh Vinh', userID: '1e097828a6c5ae65f94b78f3'},
	{fullname: 'F-Đặng Quốc Cường', image: 'images/img-thumbnail2.png', companySign: 'QUCO', companyName: 'Công ty cổ phần Quốc Cường', userID: '1e097828a6c5ae65f94b78f4'},
];
	
// Demo danh sách user thuộc danh bạ của công ty: gồm cả trong và ngoài công ty (linkUser trong contact-coll.js)
let listContactsOfCompanyDemo = [
	{fullname: 'C-Nguyễn Hữu Hiệp', companySign: 'TGO', companyName: 'Công ty cổ phần FSTeam', image: 'images/img-thumbnail1.png', userID: '2e097828a6c5ae65f94b78f1'},
	{fullname: 'C-Nguyễn Tấn Cảnh', companySign: 'MOBILE', companyName: 'Công ty cổ phần Mobile', image: 'images/img-thumbnail2.png', userID: '2e097828a6c5ae65f94b78f2'},
	{fullname: 'C-Trịnh Đình Duy', companySign: 'FREE', companyName: 'Công ty TNHH Free', image: 'images/img-thumbnail3.png', userID: '2e097828a6c5ae65f94b78f3'},
];

// Demo danh sách user tìm kiếm trả về
let listSearchUsersDemo = [
	{fullname: 'S-Nguyễn Mạnh Luân', companySign: 'FE', companyName: 'Công ty cổ phần Frontend', image: 'images/img-app-1.jpg', userID: '3e097828a6c5ae65f94b78f1'},
	{fullname: 'S-Nguyễn Đình Trọng', companySign: 'DES', companyName: 'Công ty TNHH Design', image: 'images/img-app-2.jpg', userID: '3e097828a6c5ae65f94b78f2'},
	{fullname: 'S-Ngô Kiến Huy', companySign: 'BIG', companyName: 'Công ty TNHH Bigbang', image: 'images/img-app-3.jpg', userID: '3e097828a6c5ae65f94b78f3'},
];

// Demo danh sách thành viên dự án (members[] in pcm_project-coll.js)
let listProjectMembersDemo = [
	{fullname: 'P-Nguyễn Quang Sáng', companySign: 'LIG', companyName: 'Công ty cổ phần Ligobay', image: 'images/img-app-1.jpg', userID: '4e097828a6c5ae65f94b78f1'},
	{fullname: 'P-Trương Duy Linh', companySign: 'DLH', companyName: 'Công ty cổ phần DLH', image: 'images/img-app-2.jpg', userID: '4e097828a6c5ae65f94b78f2'},
	{fullname: 'P-Vàng A Chuối', companySign: 'TAY', companyName: 'Công ty TNHH Dân tộc tày', image: 'images/img-app-3.jpg', userID: '4e097828a6c5ae65f94b78f3'},
];

// Demo danh sách user trong một công việc: người tạo việc, người thực hiện, những người liên quan
let listUsersInTask = [
	{fullname: 'Người Tạo Việc', companySign: 'TGO', companyName: 'Công ty cổ phần FSTeam', image: 'images/img-thumbnail1.png', userID: '5e097828a6c5ae65f94b78f1'},
	{fullname: 'Người Thực Hiện', companySign: 'MOBILE', companyName: 'Công ty cổ phần Mobile', image: 'images/img-thumbnail2.png', userID: '5e097828a6c5ae65f94b78f2'},
	{fullname: 'Người Liên Quan 1', companySign: 'FREE', companyName: 'Công ty TNHH Free', image: 'images/img-thumbnail3.png', userID: '5e097828a6c5ae65f94b78f3'},
	{fullname: 'Người Liên Quan 2', companySign: 'FREE', companyName: 'Công ty TNHH Free', image: 'images/img-thumbnail3.png', userID: '5e097828a6c5ae65f94b78f4'},
	{fullname: 'Người Liên Quan 3', companySign: 'FREE', companyName: 'Công ty TNHH Free', image: 'images/img-thumbnail3.png', userID: '5e097828a6c5ae65f94b78f5'},
];

// Chọn tất cả thành viên vào danh sách
$(document).on('click', '.foundUserSelectAll', function () {

	// Hiển thị danh sách (!Cần check lại để đảm bảo lấy đúng phần tử)
	let listSelectedUser = $('.talm-member-selected');
	$(this).parent().find('.tam-spamp-member-item-container .foundUser').each(function(){
		let item = $(this);

		let fullname = item.find('.fullname').text();
		let image =  item.find('img').attr('src');
		let companySign = item.find('.companySign').text();
		let companyName = item.attr('title');
		let userID =  item.attr('_userID');

		let selectedElement = getInfoSelectedUser({fullname, image, companySign, companyName, userID});

		listSelectedUser.append(selectedElement);
		
		// Cập nhật phần tử của mảng
		if(!listSelected.includes(userID)){
			listSelected.push(userID);
		}

		// Remove item
		item.remove()

		console.log(listSelected)
    });
});

// Chọn thành viên vào danh sách
$(document).on('click', '.foundUser', function () {
	// Remove khỏi danh sách hiển thị
	$(this).remove();

	// Reset input
	$('.talm-dropdown-search input').val('');

	// Hiển thị danh sách (!Cần check lại để đảm bảo lấy đúng phần tử)
	let listSelectedUser = $('.talm-member-selected');

	let fullname = $(this).find('.fullname').text();
	let image =  $(this).find('img').attr('src');
	let companySign = $(this).find('.companySign').text();
	let companyName = $(this).attr('title');
	let userID =  $(this).attr('_userID');

	let selectedElement = getInfoSelectedUser({fullname, image, companySign, companyName, userID});

	listSelectedUser.append(selectedElement);
	
	// Cập nhật phần tử của mảng
	if(!listSelected.includes(userID)){
		listSelected.push(userID);
	}

	console.log(listSelected)
});

// Hủy chọn thành viên từ danh sách đã chọn
$(document).on('click', '.selectedUser', function () {
	// Remove khỏi danh sách lựa chọn
	$(this).remove();

	// Trả về hiển thị danh sách (!Cần check lại để đảm bảo lấy đúng phần tử)
	let listFoundUser = $('.tam-spamp-member-item-container');

	let fullname = $(this).find('.fullname').text();
	let image =  $(this).find('img').attr('src');
	let companySign = $(this).find('.companySign').text();
	let companyName = $(this).attr('title');
	let userID =  $(this).attr('_userID');

	let removeElement = getInfoFoundUser({fullname, image, companySign, companyName, userID});

	listFoundUser.prepend(removeElement);

	// Cập nhật phần tử của mảng
	for( var i = 0; i < listSelected.length; i++){ 
		if ( listSelected[i].toString() === userID.toString()) {
			listSelected.splice(i, 1); 
		}
	}

	console.log(listSelected)
});

//_________________CONVERT STRING
function nl2p(string){
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    let paragraphs = '';
    let arr = string.split("\n");
    for (const item of arr) { 
        paragraphs = paragraphs + '<p>' + item.replace(urlRegex, '<a style="font-weight: normal;" href="$1">$1</a>') + '</p>'; 
    }
    return paragraphs;
}


/*
* //====================================================================(END) BACKEND====================================================================//
*/