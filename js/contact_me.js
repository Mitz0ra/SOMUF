$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // erro adicional de mensagens de erro/eventos
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // impedir o comportamento de envio padrão
      // pega valores do formulario
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // Para mensagem de sucesso/falha
      // Verifica se há espaço em branco no nome da mensagem de Sucesso / Falha
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Desativa o botão enviar até que a chamada AJAX seja concluída p evitar mensagens duplicadas
      $.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
          name: name,
          phone: phone,
          email: email,
          message: message
        },
        cache: false,
        success: function() {
          // Mensagem de sucesso
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          //Limpa todos campos
          $('#contactForm').trigger("reset");
        },
        error: function() {
          // Mensagem de Falha
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Desculpas " + firstName + ", parece que nosso servidor de email não está respondendo.. Por favor, tente mais tarde!"));
          $('#success > .alert-danger').append('</div>');
          //Limpar TODOS campos
          $('#contactForm').trigger("reset");
        },
        complete: function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-habilita botao de enviar
          }, 1000);
        }
      });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*Ao Clicar em ocultar caixa de msg de falha/sucesso.*/
$('#name').focus(function() {
  $('#success').html('');
});
