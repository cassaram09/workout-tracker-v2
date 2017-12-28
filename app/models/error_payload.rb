class ErrorPayload
  attr_reader :identifier, :status

  def initialize(identifier, status)
    @identifier = identifier
    @status = status
  end

  def as_json(*)
    {
      status: Rack::Utils.status_code(status),
      code: identifier,
      title: translated_payload[:title],
      detail: translated_payload[:detail],
    }
  end
  
  def translated_payload
    I18n.translate("errors.#{identifier}")
  end
end