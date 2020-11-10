!function(e){var t={};function i(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=40)}({0:function(e,t){e.exports=jQuery},1:function(e,t){e.exports=function(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},12:function(e,t,i){"use strict";(function(e,a){i.d(t,"a",(function(){return n}));var n=function(t){t.tooltip({content:function(){return e(this).prop("title")},tooltipClass:"edd-ui-tooltip",position:{my:"center top",at:"center bottom+10",collision:"flipfit"},hide:{duration:200},show:{duration:200}})};a(document).ready((function(e){n(e(".edd-help-tip"))}))}).call(this,i(0),i(0))},40:function(e,t,i){"use strict";i.r(t),function(e,t){var a=i(5),n=i(12),d=(i(41),{init:function(){this.add(),this.move(),this.remove(),this.type(),this.prices(),this.files(),this.updatePrices(),this.showAdvanced()},clone_repeatable:function(t){var i,a=1;t.parent().find(".edd_repeatable_row").each((function(){var t=e(this).data("key");parseInt(t)>a&&(a=t)})),i=a+=1;var d=t.clone();return d.removeClass("edd_add_blank"),d.attr("data-key",i),d.find("input, select, textarea").val("").each((function(){var t=e(this),a=t.attr("name"),n=t.attr("id");a&&(a=a.replace(/\[(\d+)\]/,"["+parseInt(i)+"]"),t.attr("name",a)),t.attr("data-key",i),void 0!==n&&(n=n.replace(/(\d+)/,parseInt(i)),t.attr("id",n))})),d.find("select").each((function(){e(this).val(t.find('select[name="'+e(this).attr("name")+'"]').val())})),d.find('input[type="checkbox"]').each((function(){e(this).is(":checked")&&e(this).prop("checked",!1),e(this).val(1)})),d.find("span.edd_price_id").each((function(){e(this).text(parseInt(i))})),d.find("input.edd_repeatable_index").each((function(){e(this).val(parseInt(e(this).data("key")))})),d.find("span.edd_file_id").each((function(){e(this).text(parseInt(i))})),d.find(".edd_repeatable_default_input").each((function(){e(this).val(parseInt(i)).removeAttr("checked")})),d.find(".edd_repeatable_condition_field").each((function(){e(this).find("option:eq(0)").prop("selected","selected")})),d.find("label").each((function(){var t=e(this).attr("for");t&&e(this).attr("for",t.replace(/(\d+)/,parseInt(i)))})),d.find(".search-choice").remove(),d.find(".chosen-container").remove(),Object(n.a)(d.find(".edd-help-tip")),d},add:function(){e(document.body).on("click",".edd_add_repeatable",(function(t){t.preventDefault();var i=e(this).parent().prev().children(".edd_repeatable_row:last-child"),n=d.clone_repeatable(i);n.insertAfter(i).find("input, textarea, select").filter(":visible").eq(0).focus(),n.find(".edd-select-chosen").each((function(){var t=e(this);t.chosen(Object(a.a)(t))})),n.find(".edd-select-chosen").css("width","100%"),n.find(".edd-select-chosen .chosen-search input").attr("placeholder",edd_vars.search_placeholder)}))},move:function(){e(".edd_repeatable_table .edd-repeatables-wrap").sortable({axis:"y",handle:".edd-draghandle-anchor",items:".edd_repeatable_row",cursor:"move",tolerance:"pointer",containment:"parent",distance:2,opacity:.7,scroll:!0,update:function(){var t=0;e(this).find(".edd_repeatable_row").each((function(){e(this).find("input.edd_repeatable_index").each((function(){e(this).val(t)})),t++}))},start:function(e,t){t.placeholder.height(t.item.height()-2)}})},remove:function(){e(document.body).on("click",".edd-remove-row, .edd_remove_repeatable",(function(t){t.preventDefault();var i,a=e(this).parents(".edd_repeatable_row"),n=a.parent().find(".edd_repeatable_row").length,d=e(this).data("type"),r="div.edd_repeatable_"+d+"s";if(i=(e(this).is(".ui-sortable .edd_repeatable_row:first-child .edd-remove-row, .ui-sortable .edd_repeatable_row:first-child .edd_remove_repeatable")?a.next(".edd_repeatable_row"):a.prev(".edd_repeatable_row")).find("select, input, textarea, button").filter(":visible").eq(0),"price"===d){var o=a.data("key");e('.edd_repeatable_condition_field option[value="'+o+'"]').remove()}if(n>1)e("input, select",a).val(""),a.fadeOut("fast").remove(),i.focus();else switch(d){case"price":alert(edd_vars.one_price_min);break;case"file":e("input, select",a).val("");break;default:alert(edd_vars.one_field_min)}e(r).each((function(t){e(this).find("input, select").each((function(){var i=e(this).attr("name");i=i.replace(/\[(\d+)\]/,"["+t+"]"),e(this).attr("name",i).attr("id",i)}))}))}))},type:function(){e(document.body).on("change","#_edd_product_type",(function(t){var i=e("#edd_products"),a=e("#edd_download_files"),n=e("#edd_download_limit_wrap");"bundle"===e(this).val()?(i.show(),a.hide(),n.hide()):(i.hide(),a.show(),n.show())}))},prices:function(){e(document.body).on("change","#edd_variable_pricing",(function(t){var i=e(this).is(":checked"),a=e("#edd_regular_price_field"),n=e("#edd_variable_price_fields, .edd_repeatable_table .pricing"),d=e(".edd-bundled-product-row, .edd-repeatable-row-standard-fields");i?(a.hide(),n.show(),d.addClass("has-variable-pricing")):(a.show(),n.hide(),d.removeClass("has-variable-pricing"))}))},files:function(){var t;window.formfield="",e(document.body).on("click",".edd_upload_file_button",(function(i){i.preventDefault();var a=e(this);window.formfield=a.closest(".edd_repeatable_upload_wrapper"),t?t.open():((t=wp.media.frames.file_frame=wp.media({title:a.data("uploader-title"),library:{type:"image"},button:{text:a.data("uploader-button-text")},multiple:"0"!==e(this).data("multiple")})).on("menu:render:default",(function(e){e.unset("library-separator"),e.unset("gallery"),e.unset("featured-image"),e.unset("embed"),e.set({})})),t.on("select",(function(){t.state().get("selection").each((function(t,i){var a="image"===(t=t.toJSON()).type&&e(".attachment-display-settings .size option:selected").val(),n=t.url,r=t.title.length>0?t.title:t.filename;if(a&&void 0!==t.sizes[a]&&(n=t.sizes[a].url),"image"===t.type&&(r=a&&void 0!==t.sizes[a]?r+"-"+t.sizes[a].width+"x"+t.sizes[a].height:r+"-"+t.width+"x"+t.height),0===i)window.formfield.find(".edd_repeatable_attachment_id_field").val(t.id),window.formfield.find(".edd_repeatable_thumbnail_size_field").val(a),window.formfield.find(".edd_repeatable_upload_field").val(n),window.formfield.find(".edd_repeatable_name_field").val(r);else{var o=window.formfield,l=d.clone_repeatable(o);l.find(".edd_repeatable_attachment_id_field").val(t.id),l.find(".edd_repeatable_thumbnail_size_field").val(a),l.find(".edd_repeatable_upload_field").val(n),l.find(".edd_repeatable_name_field").val(r),l.insertAfter(o)}}))})),t.open())})),e(".edd_repeatable_upload_field").on("focus",(function(){var t=e(this);t.data("originalFile",t.val())})).on("change",(function(){var t=e(this);t.data("originalFile")!==t.val()&&t.closest(".edd-repeatable-row-standard-fields").find(".edd_repeatable_attachment_id_field").val(0)})),window.formfield=""},updatePrices:function(){e("#edd_price_fields").on("keyup",".edd_variable_prices_name",(function(){var t=e(this).parents(".edd_repeatable_row").data("key"),i=e(this).val(),a=e(".edd_repeatable_condition_field option[value="+t+"]");a.length>0?a.text(i):e(".edd_repeatable_condition_field").append(e("<option></option>").attr("value",t).text(i))}))},showAdvanced:function(){e(document.body).on("click",".toggle-custom-price-option-section",(function(t){t.preventDefault();var i=e(this),a=i.html()===edd_vars.show_advanced_settings;a?i.html(edd_vars.hide_advanced_settings):i.html(edd_vars.show_advanced_settings);var n=i.parents(".edd-repeatable-row-header");n.siblings(".edd-custom-price-option-sections-wrap").slideToggle(),e(":input:not(input[type=button],input[type=submit],button):visible:first",a?n.siblings(".edd-custom-price-option-sections-wrap"):n.siblings(".edd-repeatable-row-standard-fields")).focus()}))}});t(document).ready((function(e){d.init()}))}.call(this,i(0),i(0))},41:function(e,t,i){(function(e){e(document).ready((function(e){e("body").on("click","#the-list .editinline",(function(){var t=e(this).closest("tr").attr("id");t=t.replace("post-","");var i=e("#post-"+t).find(".column-price .downloadprice-"+t).val();i!==e("#post-"+t+".column-price .downloadprice-"+t).val()?e(".regprice","#edd-download-data").val(i).attr("disabled",!1):e(".regprice","#edd-download-data").val(edd_vars.quick_edit_warning).attr("disabled","disabled")})),e(document.body).on("click","#bulk_edit",(function(){var t=e("#bulk-edit"),i=new Array;t.find("#bulk-titles").children().each((function(){i.push(e(this).attr("id").replace(/^(ttle)/i,""))}));var a=e('#edd-download-data input[name="_edd_regprice"]').val(),n={action:"edd_save_bulk_edit",edd_bulk_nonce:i,post_ids:i,price:a};e.post(ajaxurl,n)}))}))}).call(this,i(0))},5:function(e,t,i){"use strict";(function(e){i.d(t,"a",(function(){return o}));var a=i(1),n=i.n(a);function d(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,a)}return i}var r={disable_search_threshold:13,search_contains:!0,inherit_select_classes:!0,single_backstroke_delete:!1,placeholder_text_single:edd_vars.one_option,placeholder_text_multiple:edd_vars.one_or_more_option,no_results_text:edd_vars.no_results_text},o=function(t){!t instanceof e&&(t=e(t));var i=r;return t.data("search-type")&&delete i.disable_search_threshold,function(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?d(Object(i),!0).forEach((function(t){n()(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):d(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}({},i,{width:t.css("width")})}}).call(this,i(0))}});
//# sourceMappingURL=edd-admin-downloads.js.map