
//______________________________ADD EMOTICON TO INPUT TEXTAREA
function emojiInitial() {
	new EmojiPicker();
	$('[data-emoji-picker="true"]').each(function() {
		$(this).attr("data-emoji-picker", "false");
	});
}

$(document).ready(function() {

	emojiInitial();
	//_______________________________INITIAL TOOLTIP EVENT
	$('[data-toggle="tooltip"]').tooltip();
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
// $(document).on('click', '.tci-close-btn', function (e) {
// 	$(this).closest(".t-chat-item").addClass("hide");
// });
// $(document).on('click', '.tcl-item', function (e) {
// 	$(".t-chat-item").removeClass("hide");
// });

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
$(document).on('click', '.t-checkbox', function (e) {
	const thisInput = $(this).find("input");
	if(thisInput.prop("checked")) {
		thisInput.prop("checked", false);
		console.log(thisInput.prop("checked"))
	} else {
		thisInput.prop("checked", true);
		console.log(thisInput.prop("checked"))
	}
});

//_________________________ADD NEW POST IMAGE EVENT

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
		newItem.find(".thcp-comment-content").html(thisTextValue);
		//_______________________BIND FILE INPUT
        if (!thisFileContainer.hasClass("hide")) {
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
					'<img src="' + thisImgUrl + '" alt="News" />' +
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
	//thcp-item-edit($(this));
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
	// let selector = $(this);
	// let thisText;
	// let thisFileContainer;
	// let thisImageContainer;
	// if (selector.hasClass("thcp-item-edit-post")) {
	// 	thisText = selector.closest(".thc-post").find(".thcp-content-container .thcp-text").text();
	// 	thisFileContainer = selector.closest(".thc-post").find(".thcp-content-container .thcs-file-name");
	// 	thisImageContainer = selector.closest(".thc-post").find(".thcp-content-container .thcp-img-container");
	// }
	// if (selector.hasClass("thcp-item-edit-comment") || selector.hasClass("thcp-item-edit-reply")) {
	// 	thisText = selector.closest(".thcp-author").find(".thcp-comment-content").text();
	// 	thisFileContainer = selector.closest(".thcp-author").find(".thcs-file-name");
	// 	thisImageContainer = selector.closest(".thcp-author").find(".thcpi-first");
	// }
	// let editSelector;
	// //_____________________check if edit post: open popup, else: bind edit comment html below the following comment
	// if (selector.hasClass("thcp-item-edit-post")) {
	// 	const popupSelector = $("#thcp-edit");
	// 	//_______________________BIND TEXT INPUT
	// 	popupSelector.find(".thcs-input-textarea").val(thisText.trim());  
	// 	popupSelector.modal("show");
	// } else if (selector.hasClass("thcp-item-edit-comment") || selector.hasClass("thcp-item-edit-reply")) {
	// 	//thcp-comment-input-container
	// 	//thcp-author 
	// 	//$(this).parents('.thcp-author').find('.thcp-comment-content').html()
		
	// 	editSelector = $("#thcp-edit-comment").clone().removeAttr("id");
	// 	//_______________________BIND FILE & IMAGE - NEW INPUT ID
	// 	const newUploadFileInputId = 'thcs-input-file-content-edit-status' + newCommentIdIncrease;
	// 	editSelector.find(".thcs-input-file").attr("id", newUploadFileInputId);
	// 	editSelector.find("label.thcs-input-file-template").attr("for", newUploadFileInputId);
	// 	const newUploadImgInputId = 'thcs-input-image-content-edit-status' + newCommentIdIncrease;
	// 	editSelector.find(".thcs-input-image-content").attr("id", newUploadImgInputId);
	// 	editSelector.find("label.thcs-input-image-content-template, label.thcs-img-item-add").attr("for", newUploadImgInputId);
	// 	newCommentIdIncrease++;
	// 	if (selector.hasClass("thcp-item-edit-post")) {
	// 		selector.closest(".thc-post").find(".thcp-content-container").after(editSelector);
	// 	} else if (selector.hasClass("thcp-item-edit-comment") || selector.hasClass("thcp-item-edit-reply")) {
	// 		selector.closest(".thcp-author").after(editSelector);
	// 	}
	// 	$(this).parents('.thcp-author').next().children('.thcp-comment-input').find('div').first().html($(this).parents('.thcp-author').find('.thcp-comment-content').html())
	// 	//_______________________BIND EMOJI EVENT FOR THIS NEW INPUT
	// 	editSelector.find(".thcs-input-textarea").attr("data-emoji-picker", "true");
	// 	emojiInitial();
	// }
});

$(document).on('click', '.thcs-btn-cancel', function (e) {
	$(this).closest(".thc-input-container").remove();
});

//_________________________NEW LINE FOR TEXT INPUT STATUS WHEN PRESS "ENTER"

$(document).on('keyup', '.thcs-input-textarea', function (e) {
	if ((e.ctrlKey || e.shiftKey) && e.keyCode === 13) {
		$(this).outerHeight($(this).outerHeight() + 19);
	} else if (e.keyCode === 13 && $(this).closest(".thcp-comment-input-container").length > 0) {
		//postNewComment($(this));
	} else if (e.keyCode === 13 && $(this).closest(".thc-status").length > 0) {
		$(this).outerHeight($(this).outerHeight() + 19);
	} else if (e.shiftKey && e.keyCode === 50) {
		$(this).closest(".thc-input-container").find(".thcs-tag-container-dropdown > a").trigger("click");
	}
});

//_________________________DELETE IMAGE ITEM EVENT
$(document).on('click', '.thcs-img-item-delete', function () {
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
// $(document).on('click', '.thcs-tag-dropdown-item', function () {
	// const thisName = '<a href="javascript:void(0)" class="ta-tag-user">' + $(this).text() + '<span class="ta-tag-user-remove"><img src="images/icon-close.svg" alt="Remove" /></span></a>&nbsp;&nbsp;';
	// const thisTextInput = $(this).closest(".thc-input-container").find(".thcs-input-textarea");
	// thisTextInput.append(thisName);
	// setCaret(thisTextInput[0], thisTextInput.text().length - 1);
// });

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