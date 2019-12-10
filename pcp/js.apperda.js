$(function () {

    if (application.functions.getId() == 0) {
        application.jsfunction('plastrela.pcp.ap.js_usuarioUltimoAp', {
            idoprecurso: application.functions.getUrlParameter('parent')
        }, function (response) {
            if (response.data.id) {
                var newOption = new Option(response.data.text, response.data.id, false, false);
                $('select[name="iduser"]').append(newOption).trigger('change');
            }
        });
        $('input[name="datahora"]').val(moment().format('DD/MM/YYYY HH:mm'));
        setTimeout(function () {
            $('select[name="idtipoperda"').focus();
        }, 100);
    }

    var $idtipoperda = $('select[name="idtipoperda"]');
    var $idetapacausa = $('select[name="idetapacausa"]');
    var $idrecursocausa = $('select[name="idrecursocausa"]');

    $idetapacausa.attr('data-where', 'id in (select idetapa from pcp_etapacausaperda where idtipoperda = ' + ($idtipoperda.val() || '0') + ')');
    $idrecursocausa.attr('data-where', 'id in (select r.id from pcp_tprecurso tpr left join pcp_recurso r on (tpr.id = r.idtprecurso) left join pcp_etapa e on (tpr.id = e.idtprecurso) where e.id = ' + ($idetapacausa.val() || '0') + ')');

    $idtipoperda.change(function () {
        $idetapacausa.val(null).trigger('change');
        $idetapacausa.attr('data-where', 'id in (select idetapa from pcp_etapacausaperda where idtipoperda = ' + ($idtipoperda.val() || '0') + ')');
    });
    $idetapacausa.change(function () {
        $idrecursocausa.val(null).trigger('change');
        $idrecursocausa.attr('data-where', 'id in (select r.id from pcp_tprecurso tpr left join pcp_recurso r on (tpr.id = r.idtprecurso) left join pcp_etapa e on (tpr.id = e.idtprecurso) where e.id = ' + ($idetapacausa.val() || '0') + ')');
    });

});